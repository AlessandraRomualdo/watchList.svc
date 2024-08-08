import { Injectable } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Injectable()
export class SerieService {
  create(createSerieDto: CreateSerieDto) {
    return 'This action adds a new serie';
  }

  findAll() {
    return `This action returns all serie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serie`;
  }

  update(id: number, updateSerieDto: UpdateSerieDto) {
    return `This action updates a #${id} serie`;
  }

  remove(id: number) {
    return `This action removes a #${id} serie`;
  }
}
