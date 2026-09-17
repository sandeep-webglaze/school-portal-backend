import { Counter } from 'prom-client';
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class AppMetricsService {
    constructor(
        @InjectMetric('total_requests') public total_requests: Counter<string>,
        @InjectMetric('error_requests') public error_requests: Counter<string>,
        @InjectMetric('error_database') public error_database: Counter<string>,
        @InjectMetric('error_application') public error_application: Counter<string>,
        @InjectMetric('error_unknown') public error_unknown: Counter<string>,
    ) { }
}
