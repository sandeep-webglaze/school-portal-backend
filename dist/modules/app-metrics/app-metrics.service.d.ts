import { Counter } from 'prom-client';
export declare class AppMetricsService {
    total_requests: Counter<string>;
    error_requests: Counter<string>;
    error_database: Counter<string>;
    error_application: Counter<string>;
    error_unknown: Counter<string>;
    constructor(total_requests: Counter<string>, error_requests: Counter<string>, error_database: Counter<string>, error_application: Counter<string>, error_unknown: Counter<string>);
}
