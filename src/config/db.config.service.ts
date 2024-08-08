import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
  // injetando o ConfigService para acessar variáveis de ambiente do arquivo .env
  constructor(private configService: ConfigService) {}

  // método para criar as opções de configuração do TypeORM com base nas variáveis de ambiente do arquivo .env e retorná-las para o TypeOrmModule.forRootAsync no AppModule do NestJS
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    };
  }
}
