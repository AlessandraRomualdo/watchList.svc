import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from './authentication.service';
import { JwtService } from '@nestjs/jwt';

export interface RequestWithUser extends Request {
  user: UserPayload;
}

// classe para verificar se o usuário está autenticado e tem permissão para acessar as rotas protegidas
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // pega a requisição do contexto e extrai o token do header de autorização da requisição HTTP
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);
    // se não tiver token, lança uma exceção de não autorizado
    if (!token) throw new UnauthorizedException('Usuário não autorizado');
    try {
      // verifica se o token é válido e extrai o payload do token para a requisição
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      // se o token for inválido, lança uma exceção de não autorizado
      console.error(error);
      throw new UnauthorizedException('JWT token inválido');
    }
    // se o token for válido, retorna true para permitir o acesso às rotas protegidas
    return true;
  }

  private extractToken(request: Request): string | undefined {
    // formato do token: Bearer token
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // se o tipo do token for Bearer, retorna o token, senão retorna undefined
    return type === 'Bearer' ? token : undefined;
  }
}

// classe para verificar se o usuário é um admin e tem permissão para acessar as rotas protegidas
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Verifica se o usuário está autenticado e se possui a role de admin
    if (user && user.role === 'admin') {
      return true; // Permite o acesso às rotas protegidas para admin
    }

    throw new UnauthorizedException('Usuário não tem permissão de admin');
  }
}

// classe para verificar se o usuário é um editor e tem permissão para acessar as rotas protegidas
@Injectable()
export class EditorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Verifica se o usuário está autenticado e se possui a role de editor
    if (user && user.role === 'editor') {
      return true; // Permite o acesso às rotas protegidas para editor
    }

    throw new UnauthorizedException('Usuário não tem permissão de editor');
  }
}
