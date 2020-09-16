import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class QueryFailedExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
