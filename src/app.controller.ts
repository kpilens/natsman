import { Controller, Body, UseInterceptors, Inject, Post, Get, ConflictException } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';


/* Imports required to interact with service */
import { MessageService } from './shared/modules/message/message.service';
import { MicroserviceMessage, RequestMessage } from './shared/modules/message/types/MicroserviceMessage'
import { MetricsInterceptor } from './shared/interceptors/MetricsInterceptor'
import { MetadataInterceptor } from './shared/interceptors/MetadataInterceptor'
import { lastValueFrom } from './shared/rxjs'

@UseInterceptors(MetricsInterceptor, MetadataInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageProxy: MessageService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



  @Post('/send')
  async sendRequest(@Body() data: RequestMessage): Promise<any> {
    this.logger.debug('in request send');

    try {
      const result$ = this.messageProxy.sendMessage<string, MicroserviceMessage>({ ...data.pattern }, data.message)
      return await lastValueFrom(result$)
    } catch (error) {
      console.log(error)
      throw new ConflictException(error)
    }
  }

  @Post('/emit')
  async emitRequest(@Body() data: RequestMessage): Promise<any> {
    this.logger.debug('in request emit');

    try {
      const result$ = this.messageProxy.emitMessage<string, MicroserviceMessage>({ ...data.pattern }, data.message)
      return await lastValueFrom(result$)
    } catch (error) {
      console.log(error)
      throw new ConflictException(error)
    }
  }

}