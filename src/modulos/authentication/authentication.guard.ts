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

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('Usuário não autorizado');
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT token inválido');
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    // formato do token: Bearer token
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // se o tipo do token for Bearer, retorna o token, senão retorna undefined
    return type === 'Bearer' ? token : undefined;
  }
}
