import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NatsOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class NatsConfigService {
    constructor(private configService: ConfigService) { }

    get getNATSConfig(): NatsOptions {
        return {
            transport: Transport.NATS,
            options: {
                url: this.configService.get<string>('NATS_URL') || '',
                user: this.configService.get<string>('NATS_USER') || '',
                pass: this.configService.get<string>('NATS_PASSWORD') || '',
                name: this.configService.get<string>('SERVICE_NAME'),
                queue: this.configService.get<string>('SERVICE_NAME')
            }
        };
    }
}
