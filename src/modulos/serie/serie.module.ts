import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerieEntity } from './serie.entity';
import { GenderModule } from '../gender/gender.module';

@Module({
  imports: [TypeOrmModule.forFeature([SerieEntity]), GenderModule],
  controllers: [SerieController],
  providers: [SerieService],
  exports: [SerieService, TypeOrmModule],
})
export class SerieModule {}
