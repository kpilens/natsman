/**
 * The Microservice Message Module exposes the Nats Microservice
 * And provides an Injectable that enables you call the Microservice within other
 * application modules in the project
 */

import { Module, Global } from '@nestjs/common';
import { NatsConfigService } from '../../../config/NatsConfigService';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Global()
@Module({
    providers: [{
        provide: 'MESSAGE_CLIENT',
        useFactory: (natsConfigService: NatsConfigService) => ClientProxyFactory.create({ ...natsConfigService.getNATSConfig }),
        inject: [NatsConfigService]
    }, NatsConfigService, MessageService],
    exports: [MessageService]
})
export class MessageModule { }