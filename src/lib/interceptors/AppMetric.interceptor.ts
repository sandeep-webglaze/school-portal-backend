import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MongooseError } from 'mongoose';
import { Request } from "express";
import { AppMetricsService } from '@/src/modules/app-metrics/app-metrics.service';

@Injectable()
export class AppMetricInterceptor implements NestInterceptor {
    constructor(private readonly metricService: AppMetricsService) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const req: Request = context.switchToHttp().getRequest<Request>();

        // ignore metrics requests
        if (req.path.includes("metrics")) return next.handle();

        this.metricService.total_requests.inc();
        return next.handle().pipe(
            tap({
                error: (err: Error): void => {
                    this.errorMetrics(err, context);
                },
            }),
        );
    }

    errorMetrics(error: Error, context: ExecutionContext) {
        if (error instanceof MongooseError) {
            this.metricService.error_requests.inc();
            this.metricService.error_database.inc();
        } else if (error instanceof HttpException) {
            this.httpError(error)
        } else {
            this.metricService.error_unknown.inc();
            this.metricService.error_requests.inc();
        }
    }

    httpError(error: Error) {
        if (!(error instanceof HttpException)) return;
        const statusCode: number = error.getStatus();

        // skip known http error
        if (statusCode < HttpStatus.INTERNAL_SERVER_ERROR) return;

        this.metricService.error_requests.inc();
        this.metricService.error_application.inc();
    }
}
