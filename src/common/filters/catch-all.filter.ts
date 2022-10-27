import {
  ArgumentsHost,
  BadGatewayException,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(
  BadRequestException,
  BadGatewayException,
  NotFoundException,
  InternalServerErrorException,
)
export class CatchAllFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, argsHost: ArgumentsHost) {
    const ctx = argsHost.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);
    const ip = req.ip;
    const headers = req.headers;
    const host = headers.host;
    const userAgent = headers['user-agent'];
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
      headers: {
        host: host,
        userAgent: userAgent,
      },
    });
  }
}
