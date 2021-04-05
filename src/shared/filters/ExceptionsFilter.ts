/**
 * Use Exceptions Filter to catch any exceptions and return in 
 * response object for RPC & Events
 */

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,

} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices'

@Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//     catch(exception: unknown, host: ArgumentsHost): void {
//         // console.log(host.switchToRpc().getData(), "IN ERRORS EXCEPTION FILTERS")
//         let status = 500;
//         const errors = {
//             http: {
//                 ctx: 'http',
//                 request: host.switchToHttp().getRequest(),
//                 response: host.switchToHttp().getResponse(),
//             },
//             rpc: {
//                 ctx: 'rpc',
//                 request: host.switchToRpc().getContext(),
//                 response: host.switchToRpc().getData(),

//             }
//         }

//         // gETtYPE sWITCH STATEMENT 'http' | 'ws' | 'rpc';

//         function _getHttpContext() {
//             const ctx = host.switchToHttp();
//             const request = ctx.getRequest();
//             const response = ctx.getResponse();
//             return {
//                 request,
//                 response
//             }
//         }

//         function _getRpcContext() {
//             const ctx = host.switchToHttp();
//             const request = ctx.getRequest()
//             const response = ctx.getResponse()
//         }


//         if (exception instanceof HttpException) {
//             status = 422
//         }

//         response.status(status).json({
//             statusCode: status,
//             timestamp: new Date().toISOString(),
//             message: response.message,
//             path: request.url,
//         });
//     }
// }


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const incoming: any = host.getArgs();

        console.log(host.getType(), "IN ERRORS EXCEPTION FILTERS")
        console.log(incoming[0]?.metadata, incoming[1].args, "IN ERRORS EXCEPTION FILTERS")


        const ctx = host.switchToHttp();

        const request = ctx.getRequest();
        const response = ctx.getResponse();

        let status = 500;
        let message = "error";

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            message = exception.message
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message,
            path: request.url,
        });
    }
}