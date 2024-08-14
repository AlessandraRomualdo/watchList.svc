import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    // importando o JwtModule e configurando o segredo e o tempo de expiração do token JWT para 72 horas
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '72h' },
        };
      },
      // injetando o ConfigService para pegar a variável de ambiente JWT_SECRET
      inject: [ConfigService],
      // o escopo do módulo é global para que o JwtModule seja acessível em toda a aplicação
      global: true,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
