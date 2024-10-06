// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitando CORS para permitir requisições de outras origens, como o frontend Angular
  app.enableCors({
    origin: 'http://localhost:4200', // URL do frontend Angular
  });

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - WatchList')
    .setDescription(
      'Uma documentação simples para o projeto WatchList, que é um projeto de estudo de NestJS e TypeORM',
    )
    .setVersion('1.0')
    // .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
