import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'src/modules/Logger/GlobalLogger';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const type = host.getType();

    if (type === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      const isGraphql = 'graphql' in request;
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error';

      // Log error details
      Logger.error(
        {
          type: host.getType(),
          isGraphql: isGraphql,
          status: status,
          message: message,
          path: isGraphql ? request.body.operationName : request.url,
        },
        'Error encountered',
      );

      if (isGraphql) {
        throw new Error(
          JSON.stringify({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.body.operationName,
            message: message,
          }),
        );
      } else {
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message,
        });
      }
    }
  }
}
