import { forwardRef, Module } from '@nestjs/common';
import { ListSerieService } from './list-serie.service';
import { ListSerieController } from './list-serie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListSerieEntity } from './list-serie.entity';
import { ListModule } from '../list/list.module';
import { SerieModule } from '../serie/serie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListSerieEntity]),
    forwardRef(() => ListModule),
    ListModule,
    SerieModule,
  ],
  controllers: [ListSerieController],
  providers: [ListSerieService],
  exports: [ListSerieService, TypeOrmModule],
})
export class ListSerieModule {}
