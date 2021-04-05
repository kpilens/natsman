import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { app as config } from '../api.config';
import { NatsConfigService } from './config/NatsConfigService';
import { AllExceptionsFilter } from './shared/filters/ExceptionsFilter'
import { TimeoutInterceptor } from './shared/interceptors/TimeoutInterceptor';
import { LoggerFactory } from './shared/modules/metrics/logger.factory';



async function bootstrap() {
  const loggerSetup: LoggerFactory = new LoggerFactory()
  const logger = WinstonModule.createLogger(loggerSetup.console())

  /* Initialize Nestjs App Module */
  const port = config().port;
  const app = await NestFactory.create(
    AppModule.register(),
    {
      cors: {
        origin: "*"
      },
      logger
    }
  );

  /* Initialize dependencies that depend on the Singleton Object */
  const natsConfigService: NatsConfigService = app.get<NatsConfigService>(NatsConfigService)

  /* Use Helmets sensible defaults to adds secure headers to our req/res */
  app.use(helmet())
  app.useGlobalFilters(new AllExceptionsFilter)
  app.useGlobalInterceptors(new TimeoutInterceptor)
  app.connectMicroservice({
    ...natsConfigService.getNATSConfig
  })

  /* Start Microservice */
  app.startAllMicroservicesAsync();

  /* Start HTTP Service */
  await app.listen(port, () => logger.log(`Hybrid HTTP / Microservice Application running on port ${port} `));
}
bootstrap();
