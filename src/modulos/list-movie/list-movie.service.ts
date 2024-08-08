import { Injectable } from '@nestjs/common';
import { CreateListMovieDto } from './dto/create-list-movie.dto';
import { UpdateListMovieDto } from './dto/update-list-movie.dto';

@Injectable()
export class ListMovieService {
  create(createListMovieDto: CreateListMovieDto) {
    return 'This action adds a new listMovie';
  }

  findAll() {
    return `This action returns all listMovie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listMovie`;
  }

  update(id: number, updateListMovieDto: UpdateListMovieDto) {
    return `This action updates a #${id} listMovie`;
  }

  remove(id: number) {
    return `This action removes a #${id} listMovie`;
  }
}
