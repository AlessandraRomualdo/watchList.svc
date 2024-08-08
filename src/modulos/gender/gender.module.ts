import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderEntity } from './gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenderEntity])],
  controllers: [GenderController],
  providers: [GenderService],
  exports: [GenderService, TypeOrmModule],
})
export class GenderModule {}
