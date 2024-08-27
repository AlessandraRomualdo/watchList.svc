import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from '../../modulos/authentication/authentication.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}

  // intercepta todas as requisições HTTP da API e exibe logs no console
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // pega a requisição e a resposta do contexto HTTP
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequestWithUser>();
    const res = contextHttp.getResponse<Response>();
    const { method, url } = request;
    const { statusCode } = res;
    // exibe logs no console com o método HTTP, a URL da requisição e o status code da resposta
    this.logger.log('Request: ' + method + ' ' + url);
    const instantPreControler = Date.now();
    // intercepta a requisição e a resposta HTTP e exibe logs no console com o tempo de execução da requisição
    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(
            'Route: ' + request.route.path + ' | User: ' + request.user.email,
          );
        }
        // exibe logs no console com o método HTTP, a URL da requisição, o status code da resposta e o tempo de execução da requisição em milissegundos
        const instantPosControler = Date.now() - instantPreControler;
        this.logger.log(
          'Response: ' +
            method +
            ' ' +
            url +
            ' | Status: ' +
            statusCode +
            ' | Time: ' +
            instantPosControler +
            'ms',
        );
      }),
    );
  }
}
