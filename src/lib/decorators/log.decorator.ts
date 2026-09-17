import { SetMetadata } from '@nestjs/common';
import { METHOD_LOG_METADATA } from '../constants';

/**
 * Log options
 */
export interface LogOptions {
    /**
     * Ignore the logging for req and res default to false
     */
    ignoreLog?: boolean;

    /**
     * Masking options
     */
    mask?: MaskingOptions;
}

/**
 * Masking options
 */
export interface MaskingOptions {
    /**
     * Mask of the request body. It can be a boolean or an array of strings.
     * If it is true, it will mask all the body.
     * If it is an array of strings, it will mask only the specified fields.
     */
    request?: string[] | boolean;
    /**
     * Mask of the response body. It can be a boolean or an array of strings.
     * If it is true, it will mask all the body.
     * If it is an array of strings, it will mask only the specified fields.
     */
    response?: string[] | boolean;
}

/**
 * Log decorator. It allows to customize logging behavior for each route.
 * @param options the logging options
 */
export const Log = (options: LogOptions) => SetMetadata(METHOD_LOG_METADATA, options);