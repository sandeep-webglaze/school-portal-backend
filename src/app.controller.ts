import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { Public } from './modules/auth/guards/jwt.guard';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { CachingInterceptor, NoCache } from './lib/interceptors';
import { IgnoreTransformInterceptor } from './lib/interceptors/Response.interceptor';
import { Log } from './lib/decorators/log.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
export class AppController extends PrometheusController {
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'Server Running Fine.' })
  getHello(): string {
    return 'Server Running Fine!';
  }

  @Public()
  @Get('/health')
  @ApiResponse({ status: 200, description: 'Server is Healthy.' })
  getHealth(@Req() req: Request) {
    return { domain: req.hostname, host: req.get('host') };
  }

  @Public()
  @Log({ ignoreLog: true })
  @IgnoreTransformInterceptor()
  @ApiResponse({ status: 200, description: 'Server Prometheus Metrics.' })
  @Get('metrics')
  async index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }
}
