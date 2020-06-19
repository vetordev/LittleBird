import { QueryFailedError } from 'typeorm';
import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Response, Request } from 'express';

// TODO PEGAR ERRO DE FK
@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    // console.log(exception)
    const errorResponse = {
      error: "O email ou username informados já estão presentes no banco de dados",
    };
    response.status(HttpStatus.CONFLICT).json(errorResponse);
  }
}

// TODO Fazer com que o servidor reconheça esse filter
@Catch(InternalServerErrorException)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        error: "Ocorreu um erro. Tente novamente mais tarde",
        path: request.url,
      });
  }
}