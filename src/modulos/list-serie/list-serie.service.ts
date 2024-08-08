import { Injectable } from '@nestjs/common';
import { CreateListSerieDto } from './dto/create-list-serie.dto';
import { UpdateListSerieDto } from './dto/update-list-serie.dto';

@Injectable()
export class ListSerieService {
  create(createListSerieDto: CreateListSerieDto) {
    return 'This action adds a new listSerie';
  }

  findAll() {
    return `This action returns all listSerie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listSerie`;
  }

  update(id: number, updateListSerieDto: UpdateListSerieDto) {
    return `This action updates a #${id} listSerie`;
  }

  remove(id: number) {
    return `This action removes a #${id} listSerie`;
  }
}
