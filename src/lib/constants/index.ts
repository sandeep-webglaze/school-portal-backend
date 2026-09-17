export * from './enum';
export * from './models';

export const IS_PUBLIC_ROUTE = 'isPublicRoute';
export const IGNORE_CACHING = 'IGNORE_CACHING';
export const IGNORE_TRANSFORM_INTERCEPTOR = 'IGNORE_TRANSFORM_INTERCEPTOR';
export const AUTH_ROLES_KEY = 'roles';
export const CURRENT_USER_REQ_KEY = 'user';
export const METHOD_LOG_METADATA = 'METHOD_LOG_METADATA';

export const OTP_MAX_LENGTH = 6;
export const OTP_MAX_RETRIES = 5;
export const OTP_TIME_OUT_MINUTE = 10;
export const OTP_DELTA_TIME_MIN = 10;
export const OTP_LIMIT_IN_DELTA = 10;
export const OTP_TTL_SECONDS = 3600; // 60 minutes

export const FILE_MAX_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5 MB

export const NOTIFICATION_TTL_SECONDS = 2592000; // 30 Days
