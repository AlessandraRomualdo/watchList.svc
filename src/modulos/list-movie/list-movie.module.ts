import { Module } from '@nestjs/common';
import { ListMovieService } from './list-movie.service';
import { ListMovieController } from './list-movie.controller';

@Module({
  controllers: [ListMovieController],
  providers: [ListMovieService],
})
export class ListMovieModule {}
