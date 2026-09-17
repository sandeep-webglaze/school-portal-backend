import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface LoggingInterceptorOptions {
    userPrefix?: string;
    disableMasking?: boolean;
    maskingPlaceholder?: string;
    mask?: LoggingInterceptorMaskingOptions;
}
export interface LoggingInterceptorMaskingOptions {
    requestHeader?: RequestHeaderMask;
}
export interface RequestHeaderMask {
    [headerKey: string]: boolean | ((headerValue: string | string[]) => unknown);
}
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly ctxPrefix;
    private readonly logger;
    private userPrefix;
    private disableMasking;
    private maskingPlaceholder;
    private mask;
    constructor(options?: LoggingInterceptorOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    setUserPrefix(prefix: string): void;
    setDisableMasking(disableMasking: boolean): void;
    setMaskingPlaceholder(placeholder: string | undefined): void;
    setMask(mask: LoggingInterceptorMaskingOptions): void;
    private requestBasicInfo;
    private logNext;
    private logError;
    private maskData;
    private maskHeaders;
}
