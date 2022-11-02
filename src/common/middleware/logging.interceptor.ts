import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { logException } from 'src/utils/error.utils';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let method: string;
    let url: string;
    let request: null;

    method = context.switchToHttp().getRequest<Request>().method;
    url = context.switchToHttp().getRequest<Request>().url;
    request = context.switchToHttp().getRequest<Request>()?.body;

    const now = Date.now();

    return next.handle().pipe(
      tap(originalResponse => {
        try {
          // let response = getObjectClone(originalResponse);
          Logger.log(
            `[METHOD: ${method}] [PATH: "${url}"] [DATE: ${new Date().toLocaleString()} ${
              Date.now() - now
            }ms] [REQUEST: ${JSON.stringify(request)}] `,
          );
        } catch (exception) {
          logException(exception);
        }
      }),
    );
  }
}

export function getObjectClone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}
