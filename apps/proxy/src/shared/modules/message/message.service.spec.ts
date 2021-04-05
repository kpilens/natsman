import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { NatsConfigService } from '../../../config/NatsConfigService';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

describe('MessageService', () => {
    let service: MessageService;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [ConfigService, {
                provide: 'MESSAGE_CLIENT',
                useFactory: (natsConfigService: NatsConfigService) => ClientProxyFactory.create({ ...natsConfigService.getNATSConfig }),
                inject: [NatsConfigService]
            }, NatsConfigService, MessageService],
        }).compile();

        service = module.get<MessageService>(MessageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterAll(async () => {
        if (module) {
            await module.close();
        }
    });
});
