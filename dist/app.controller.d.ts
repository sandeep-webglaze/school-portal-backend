import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { Request } from 'express';
export declare class AppController extends PrometheusController {
    getHello(): string;
    getHealth(req: Request): {
        domain: string;
        host: string;
    };
    index(response: Response): Promise<string>;
}
