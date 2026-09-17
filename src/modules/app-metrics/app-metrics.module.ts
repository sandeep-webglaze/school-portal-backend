import { Module } from '@nestjs/common';

import { AppMetricsService } from './app-metrics.service';
import { PROMETHEUS_METRICS_TYPES } from './app.metrics';

@Module({
  providers: [AppMetricsService, ...PROMETHEUS_METRICS_TYPES],
  exports: [AppMetricsService]
})
export class AppMetricsModule { }
