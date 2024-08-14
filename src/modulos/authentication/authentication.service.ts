import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
  sub: string;
  email: string;
  role?: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // aqui você pode usar o bcrypt para comparar a senha do usuário com a senha encriptada no banco
    const userAuthenticated = await bcrypt.compare(
      password,
      user.data.password,
    );

    if (!userAuthenticated)
      throw new UnauthorizedException('Usuário não autorizado');

    // aqui você pode gerar um token JWT para o usuário autenticado e retornar o token para o cliente
    const payload: UserPayload = {
      sub: user.data.id,
      email: user.data.email,
      // role: user.data.role.role,
    };
    return {
      token_aceess: await this.jwtService.signAsync(payload),
    };
  }
}
