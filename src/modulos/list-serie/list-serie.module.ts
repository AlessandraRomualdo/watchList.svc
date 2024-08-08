import { Module } from '@nestjs/common';
import { ListSerieService } from './list-serie.service';
import { ListSerieController } from './list-serie.controller';

@Module({
  controllers: [ListSerieController],
  providers: [ListSerieService],
})
export class ListSerieModule {}
