import {
    CallHandler,
    ExecutionContext,
    Logger as NestLogger,
    NestInterceptor,
    HttpException,
    Optional,
    HttpStatus,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Request, Response } from 'express';
import { CURRENT_USER_REQ_KEY, METHOD_LOG_METADATA } from '../constants';
import { LogOptions } from '../decorators/log.decorator';

/**
 * Logging interceptor options
 */
export interface LoggingInterceptorOptions {
    /**
     * User prefix to add to the logs
     */
    userPrefix?: string;
    /**
     * Disable masking
     */
    disableMasking?: boolean;
    /**
     * Masking placeholder
     */
    maskingPlaceholder?: string;
    /**
     * Masking options to apply to all routes
     */
    mask?: LoggingInterceptorMaskingOptions;
}

/**
 * Masking options of the logging interceptor
 */
export interface LoggingInterceptorMaskingOptions {
    /**
     * Masking options to apply to the headers of the request
     */
    requestHeader?: RequestHeaderMask;
}

/**
 * Masking options of the request headers
 */
export interface RequestHeaderMask {
    /**
     * Mask of a request header. The key is the header name and the value is a boolean or a function that returns the data to log.
     */
    [headerKey: string]: boolean | ((headerValue: string | string[]) => unknown);
}


export class LoggingInterceptor implements NestInterceptor {
    private readonly ctxPrefix: string = LoggingInterceptor.name;
    private readonly logger = new NestLogger(LoggingInterceptor.name);
    private userPrefix: string;
    private disableMasking: boolean;
    private maskingPlaceholder: string | undefined;
    private mask: LoggingInterceptorMaskingOptions | undefined;

    constructor(@Optional() options?: LoggingInterceptorOptions) {
        this.userPrefix = options?.userPrefix ?? '';
        this.disableMasking = options?.disableMasking ?? false;
        this.maskingPlaceholder = options?.maskingPlaceholder ?? '****';
        this.mask = options?.mask;
    }

    /**
     * Intercept method, logs before and after the request being processed
     * @param context details about the current request
     * @param call$ implements the handle method that returns an Observable
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const options: LogOptions | undefined = Reflect.getMetadata(METHOD_LOG_METADATA, context.getHandler());

        const now = Date.now();
        return next.handle().pipe(
            tap({
                next: (val: unknown): void => {
                    this.logNext(val, context, now, options);
                },
                error: (err: Error): void => {
                    this.logError(err, context, now, options);
                },
            }),
        );
    }

    /**
     * User prefix setter
     * ex. [MyPrefix - LoggingInterceptor - 200 - GET - /]
     */
    public setUserPrefix(prefix: string): void {
        this.userPrefix = `${prefix} - `;
    }

    /**
     * Set the disable masking flag
     * @param disableMasking
     */
    public setDisableMasking(disableMasking: boolean): void {
        this.disableMasking = disableMasking;
    }

    /**
     * Set the masking placeholder
     * @param placeholder
     */
    public setMaskingPlaceholder(placeholder: string | undefined): void {
        this.maskingPlaceholder = placeholder;
    }

    /**
     * Set the masking options
     * @param mask
     */
    public setMask(mask: LoggingInterceptorMaskingOptions): void {
        this.mask = mask;
    }

    private requestBasicInfo(request: Request, response: Response) {
        const { method, originalUrl } = request;
        const userAgent = request.get("user-agent") || "";
        const ip = request.headers['x-forwarded-for'] || request.ip;

        const { statusCode } = response;
        const contentLength = response.get("content-length");

        return {
            method,
            originalUrl,
            statusCode,
            contentLength,
            userAgent,
            ip,
            timestamp: new Date(),
        };
    }

    /**
   * Logs the request response in success cases
   * @param body body returned
   * @param context details about the current request
   */
    private logNext(body: unknown, context: ExecutionContext, requestTime: number, options?: LogOptions): void {
        if (options != null && options.ignoreLog) return;

        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        const basicRequestMetaInfo = this.requestBasicInfo(request, response)

        const controllerContext = context.getClass().name;
        const responseTime = Date.now() - requestTime;

        let message = `[${basicRequestMetaInfo.ip}] {${basicRequestMetaInfo.originalUrl}, ${basicRequestMetaInfo.method}} route - ${basicRequestMetaInfo.statusCode} ${responseTime}ms`;

        // const maskedBody = options?.mask?.response ? this.maskData(body, options.mask.response) : body;

        this.logger.log(
            {
                ...basicRequestMetaInfo,
                message,
                // body: maskedBody,
            },
            controllerContext,
        );
    }

    /**
   * Logs the request response in success cases
   * @param error Error object
   * @param context details about the current request
   */
    private logError(error: Error, context: ExecutionContext, requestTime: number, options?: LogOptions): void {
        if (options != null && options.ignoreLog) return;

        const req: Request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        const basicRequestMetaInfo = this.requestBasicInfo(req, response)

        const controllerContext = context.getClass().name;
        const responseTime = Date.now() - requestTime;

        if (error instanceof HttpException) {
            const statusCode: number = error.getStatus();

            const message: string = `[${basicRequestMetaInfo.ip}] {${basicRequestMetaInfo.originalUrl}, ${basicRequestMetaInfo.method}} route - ${statusCode} ${responseTime}ms`;

            const maskedBody = options?.mask?.request ? this.maskData(req.body, options.mask.request) : req.body;

            if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
                this.logger.error(
                    {
                        ...basicRequestMetaInfo,
                        body: maskedBody,
                        message,
                        error,
                    },
                    error.stack,
                    controllerContext,
                );
            } else {
                this.logger.warn(
                    {
                        ...basicRequestMetaInfo,
                        error,
                        body: maskedBody,
                        message,
                    },
                    controllerContext,
                );
            }
        } else {
            this.logger.error(
                {
                    message: `[${basicRequestMetaInfo.ip}] {${basicRequestMetaInfo.originalUrl}, ${basicRequestMetaInfo.method}} route - ${responseTime}ms`,
                },
                error.stack,
                controllerContext,
            );
        }
    }

    /**
   * Mask the given data
   * @param data the data to mask
   * @param maskingOptions the paths of the data to mask
   * @param path the current path
   * @returns the masked data
   */
    private maskData(data: unknown, maskingOptions: string[] | true, path: string = ''): unknown {
        // Parse the data to avoid having constructors like new ObjectId() in the body and handle circular references
        const parsedData = JSON.parse(JSON.stringify(data));

        if (this.disableMasking) {
            return parsedData;
        }

        if (maskingOptions === true || maskingOptions.includes(path)) {
            return this.maskingPlaceholder;
        }

        if (Array.isArray(parsedData)) {
            return parsedData.map((item: unknown): unknown => this.maskData(item, maskingOptions, path));
        }

        // eslint-disable-next-line no-null/no-null
        if (typeof parsedData === 'object' && parsedData !== null) {
            return Object.keys(parsedData).reduce<object>((maskedObject: object, key: string): object => {
                const nestedPath = path ? `${path}.${key}` : key;

                return {
                    ...maskedObject,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    [key]: this.maskData((parsedData as any)[key], maskingOptions, nestedPath),
                };
            }, {});
        }

        return parsedData;
    }

    /**
     * Mask the given headers
     * @param headers the headers to mask
     * @returns the masked headers
     */
    private maskHeaders(headers: IncomingHttpHeaders): Record<string, unknown> {
        if (this.disableMasking || this.mask?.requestHeader === undefined) {
            return headers;
        }

        return Object.keys(headers).reduce<Record<string, unknown>>(
            (maskedHeaders: Record<string, unknown>, headerKey: string): Record<string, unknown> => {
                const headerValue = headers[headerKey];
                const mask = this.mask?.requestHeader?.[headerKey];

                if (headerValue === undefined) {
                    return maskedHeaders;
                }

                if (mask === true) {
                    return {
                        ...maskedHeaders,
                        [headerKey]: this.maskingPlaceholder,
                    };
                }

                if (typeof mask === 'function') {
                    try {
                        return {
                            ...maskedHeaders,
                            [headerKey]: mask(headerValue),
                        };
                    } catch (err) {
                        this.logger.warn(`LoggingInterceptor - Masking error for header ${headerKey}`, err);

                        return {
                            ...maskedHeaders,
                            [headerKey]: this.maskingPlaceholder,
                        };
                    }
                }

                return maskedHeaders;
            },
            headers,
        );
    }
}
