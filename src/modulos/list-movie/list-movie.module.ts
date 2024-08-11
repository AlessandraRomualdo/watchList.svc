import { forwardRef, Module } from '@nestjs/common';
import { ListMovieService } from './list-movie.service';
import { ListMovieController } from './list-movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListMovieEntity } from './list-movie.entity';
import { ListModule } from '../list/list.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    // importa o TypeOrmModule para ListMovieEntity para que o TypeOrmModule possa acessar o repositório de ListMovieEntity e realizar operações de banco de dados
    TypeOrmModule.forFeature([ListMovieEntity]),
    // importa o ListModule para que o ListMovieModule possa acessar o ListModule e realizar operações de banco de dados, dependecia circular entre ListModule e ListMovieModule
    forwardRef(() => ListModule),
    ListModule,
    MovieModule,
  ],
  controllers: [ListMovieController],
  providers: [ListMovieService],
  exports: [ListMovieService, TypeOrmModule],
})
export class ListMovieModule {}
