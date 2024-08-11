import { forwardRef, Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { UserModule } from '../user/user.module';
import { ListMovieModule } from '../list-movie/list-movie.module';

@Module({
  imports: [
    // importa o TypeOrmModule para ListEntity e UserEntity para que o TypeOrmModule possa acessar os repositórios de ListEntity e UserEntity e realizar operações de banco de dados
    TypeOrmModule.forFeature([ListEntity]),
    UserModule,
    // importa o ListMovieModule para que o ListModule possa acessar o ListMovieModule e realizar operações de banco de dados, dependecia circular entre ListModule e ListMovieModule
    forwardRef(() => ListMovieModule),
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService, TypeOrmModule],
})
export class ListModule {}
