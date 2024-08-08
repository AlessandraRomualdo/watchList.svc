import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';

@Module({
  controllers: [SerieController],
  providers: [SerieService],
})
export class SerieModule {}
