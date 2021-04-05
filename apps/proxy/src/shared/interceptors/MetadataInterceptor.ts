/**
 * Over RPC we dont have the flexibility we experience in HTTP Headers, so we have to Inject
 * Our information from Nestjs Execution Context into Nats Metadata
 * @example Inject within a Controller example: @UseInterceptors(MetadataInterceptor)
 */

import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { NatsContext } from "@nestjs/microservices";

export class MetadataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        if (context.getType() === 'rpc') {
            const message = context.getArgByIndex(0);

            const natsContext = context.switchToRpc().getContext<NatsContext>();

            message.metadata.info = natsContext.getArgs();
        }

        return next.handle();
    }

}