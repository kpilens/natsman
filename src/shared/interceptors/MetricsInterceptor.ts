/**
 * @name MetricsInterceptor.ts
 * We use this to intercept all log entries from within the response and request lifecyle
 * so we can pipe them to a logging service e.g. papertrial, influxDB etc
 */

import {
  Injectable,
  Inject,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { ApplicationConfig } from '../../../api.config';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { MetricsService } from '../modules/metrics/metrics.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @Inject('MetricsService') private readonly metrics: MetricsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeDate = Date.now();
    const incoming: any = context.getArgs();
    const type = context.getType();
    if (type === 'http') {
      const request = context.switchToHttp().getRequest();
      const reqId = request.headers[ApplicationConfig.WorkspaceHeader];
      const method = request.method;
      const path = request.route.path;
      const info = { reqId, path };
      let responseTime = -1;

      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          responseTime = Date.now() - timeDate;

          this.logger.info(
            `[HTTP] | ${response.statusCode} | [${method}] ${path} - ${responseTime}ms`,
            info,
          );
        }),
        catchError(error => {
          this.logger.error(`[HTTP] | Error ${error}`, info);
          responseTime = Date.now() - timeDate;

          let status = 500;

          if (error instanceof HttpException) {
            status = error.getStatus();
          }

          this.logger.error(
            `[HTTP] | ${status} | [${method}] ${path} - ${responseTime}ms`,
            info,
          );

          return throwError(error);
        }),
        finalize(() => {
          if (this.configService.get<string>('NODE_ENV') === 'production') {
            const response = context.switchToHttp().getResponse();
            const statusCode = response.statusCode;

            /* Collect Response time over an event and log into metrics board */
            this.metrics
              .send('responseTime', {
                ms: ApplicationConfig.Name,
                statusCode,
                method,
                path,
                value: responseTime,
              })
              .catch(err => {
                this.logger.error(
                  `[METRICS] | Error sending metrics ${err}`,
                  info,
                );
              });
          }
        }),
      );
    } else if (type === "rpc") {
      let natsTopic = { cmd: 'unknown' };
      const info = {
        reqId: incoming[0]?.metadata?.reqId || '',
      };
      try {
        natsTopic = JSON.parse(incoming[1].args[0]);
      } catch (err) {
        natsTopic = { cmd: incoming[1].args[0] };
      }

      this.logger.info(
        `[RPC] | in ${JSON.stringify(incoming[0])} ${JSON.stringify(
          natsTopic,
        )}`,
        info,
      );
      return next.handle().pipe(
        tap(result => {
          this.logger.info(
            `[RPC] | out ${JSON.stringify(result)} ${JSON.stringify(incoming)}`,
            info,
          );
        }),
        catchError(err => {
          this.logger.error(`[RPC] | Error ${err}`, info);

          return throwError(err);
        }),
        finalize(() => {
          if (this.configService.get<string>('NODE_ENV') === 'production') {
            this.metrics
              .send('responseTime', {
                ms: ApplicationConfig.Name,
                ...natsTopic,
                value: Date.now() - timeDate,
              })
              .catch(err => {
                this.logger.error(
                  `[METRICS] | Error sending metrics ${err}`,
                  info,
                );
              });
          }
        }),
      );
    }
    return next.handle();
  }
}
