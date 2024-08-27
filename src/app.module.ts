import { ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modulos/role/role.module';
import { GenderModule } from './modulos/gender/gender.module';
import { MovieModule } from './modulos/movie/movie.module';
import { SerieModule } from './modulos/serie/serie.module';
import { ListMovieModule } from './modulos/list-movie/list-movie.module';
import { ListModule } from './modulos/list/list.module';
import { UserModule } from './modulos/user/user.module';
import { ListSerieModule } from './modulos/list-serie/list-serie.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AuthenticationModule } from './modulos/authentication/authentication.module';
import { LoggerGlobalInterceptor } from './recursos/interceptors/logger-global.interceptor';

@Module({
  imports: [
    // importando o ConfigModule.forRoot para carregar variáveis de ambiente de um arquivo .env na raiz do projeto e torná-las disponíveis para toda a aplicação
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // implementando o TypeOrmModule.forRootAsync com a classe DBConfigService para configurar o banco de dados usando variáveis de ambiente e o ConfigModule do NestJS
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService,
      inject: [DBConfigService],
    }),
    // importando os módulos da aplicação para serem carregados na aplicação principal do NestJS
    RoleModule,
    GenderModule,
    MovieModule,
    SerieModule,
    ListMovieModule,
    ListModule,
    UserModule,
    ListSerieModule,
    AuthenticationModule,
  ],
  // importando o AppController e o AppService para serem carregados na aplicação principal do NestJS
  controllers: [AppController],
  // importando o AppService para ser carregado na aplicação principal do NestJS e o ClassSerializerInterceptor para serializar as respostas da API e remover campos sensíveis
  providers: [
    AppService,
    // importando o ClassSerializerInterceptor para ser carregado na aplicação principal do NestJS e serializar as respostas da API para remover campos sensíveis
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor,
    },
    // importando o LoggerGlobalInterceptor para ser carregado na aplicação principal do NestJS e exibir logs no console para todas as requisições HTTP da API
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggerGlobalInterceptor,
    },
    // importando o ConsoleLogger para ser carregado na aplicação principal do NestJS e exibir logs no console
    ConsoleLogger,
  ],
})
export class AppModule {}
