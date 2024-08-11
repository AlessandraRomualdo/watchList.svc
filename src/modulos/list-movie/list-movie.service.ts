import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListMovieDto } from './dto/create-list-movie.dto';
// import { UpdateListMovieDto } from './dto/update-list-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListMovieEntity } from './list-movie.entity';
import { Repository } from 'typeorm';
import { ListEntity } from '../list/list.entity';
import { MovieEntity } from '../movie/movie.entity';

@Injectable()
export class ListMovieService {
  constructor(
    @InjectRepository(ListMovieEntity)
    private readonly listMovieRepository: Repository<ListMovieEntity>,
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async addMovieAtList(createListMovieDto: CreateListMovieDto) {
    const list = await this.listRepository.findOne({
      where: { id: createListMovieDto.listId },
    });

    if (!list) {
      throw new NotFoundException('Lista não encontrada');
    }

    const movie = await this.movieRepository.findOne({
      where: { id: createListMovieDto.movieId },
    });

    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }

    const listMovie = new ListMovieEntity();
    listMovie.list = list;
    listMovie.movie = movie.id as any;

    return await this.listMovieRepository.save(listMovie);
  }

  async findAllMoviesAtList(listId: string) {
    const listMovies = await this.listMovieRepository.find({
      where: { list: { id: listId } },
      relations: ['movie'],
    });
    return listMovies;
  }

  async removeMovieAtList(listId: string, movieId: string) {
    const listMovie = await this.listMovieRepository.findOne({
      where: { list: { id: listId }, movie: { id: movieId } },
    });

    if (!listMovie) {
      throw new NotFoundException('Filme não encontrado na lista');
    }

    return await this.listMovieRepository.remove(listMovie);
  }
}
