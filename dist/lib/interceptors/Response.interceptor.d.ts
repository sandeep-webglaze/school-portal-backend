import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare const IgnoreTransformInterceptor: () => import("@nestjs/common").CustomDecorator<string>;
export declare class TransformInterceptor implements NestInterceptor<any, Response> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response>;
}
