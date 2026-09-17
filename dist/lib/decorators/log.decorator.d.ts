export interface LogOptions {
    ignoreLog?: boolean;
    mask?: MaskingOptions;
}
export interface MaskingOptions {
    request?: string[] | boolean;
    response?: string[] | boolean;
}
export declare const Log: (options: LogOptions) => import("@nestjs/common").CustomDecorator<string>;
