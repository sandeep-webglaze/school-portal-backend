import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppMetricsService } from '@/src/modules/app-metrics/app-metrics.service';
export declare class AppMetricInterceptor implements NestInterceptor {
    private readonly metricService;
    constructor(metricService: AppMetricsService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    errorMetrics(error: Error, context: ExecutionContext): void;
    httpError(error: Error): void;
}
