import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { GenderModule } from '../gender/gender.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), GenderModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService, TypeOrmModule],
})
export class MovieModule {}
