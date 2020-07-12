import { QueryFailedError } from 'typeorm';
import { ExceptionFilter, ArgumentsHost, Catch, InternalServerErrorException } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let errorResponse;
    console.log(exception.code)

    if (exception.code == 23505) {
      errorResponse = {
        error: "O email ou username informados já estão presentes no banco de dados",
      };
      response.status(409).json(errorResponse);
    } else if (exception.code == 23503) {
      errorResponse = {
        error: "O user_img_id não existe no servidor",
      };
      response.status(400).json(errorResponse);
    } else
      response.status(500).json({ error: "Erro interno no servidor" });
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