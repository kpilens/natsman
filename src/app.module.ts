/* Rumor has it that you should import the Config Module on LINE 1 */
import { ConfigModule } from '@nestjs/config';
import { NatsConfigService } from './config/NatsConfigService';
import { MessageModule } from './shared/modules/message/message.module';
import { MetricsModule } from './shared/modules/metrics/metrics.module';
import { LoggerFactory } from './shared/modules/metrics/logger.factory';
import { WinstonModule } from 'nest-winston';
import { DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


export class AppModule {
  public static register(): DynamicModule {
    const logger: LoggerFactory = new LoggerFactory()
    const imports = [
      WinstonModule.forRoot(logger.console()),
      ConfigModule.forRoot({
        isGlobal: true,
        ignoreEnvFile: false,
        ignoreEnvVars: false
      }),
      MetricsModule,
      MessageModule

    ]

    /* Declare App Controllers */
    const controllers = [AppController]

    /* Declare App Providers */
    const providers = [NatsConfigService, AppService]

    return {
      module: AppModule,
      imports,
      controllers,
      providers
    }
  }
}
