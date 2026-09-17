import { CallHandler, ExecutionContext, Injectable, NestInterceptor, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGNORE_TRANSFORM_INTERCEPTOR } from '../constants';

export const IgnoreTransformInterceptor = () => SetMetadata(IGNORE_TRANSFORM_INTERCEPTOR, true);

@Injectable()
export class TransformInterceptor implements NestInterceptor<any, Response> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const ignoreInterceptor = Reflect.getMetadata(IGNORE_TRANSFORM_INTERCEPTOR, context.getHandler());

    if (ignoreInterceptor) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        if (data && Array.isArray(data.data) /* && isNotEmpty(data.totalCount) */) {
          return { ...data, totalCount: data.totalCount ?? 0 };
        }
        return { data };
      })
    );
  }
}
