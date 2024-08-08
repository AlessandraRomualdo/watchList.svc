import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { Repository } from 'typeorm';
import { GenderEntity } from '../gender/gender.entity';
import { isUUID } from 'class-validator';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(GenderEntity)
    private readonly genderRepository: Repository<GenderEntity>,
  ) {}
  async create(createMovieDto: CreateMovieDto) {
    const gender = await this.genderRepository.findOne({
      where: { id: createMovieDto.genderId },
    });
    if (!gender) throw new Error('Gênero não encontrado');
    const movie = new MovieEntity();
    movie.title = createMovieDto.title;
    movie.description = createMovieDto.description;
    movie.poster = createMovieDto.poster;
    movie.gender = gender;
    return this.movieRepository.save(movie);
  }

  async findAll() {
    const movies = await this.movieRepository.find({
      relations: {
        gender: true,
      },
    });
    const formatedMovies = movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        poster: movie.poster,
        gender: movie.gender.gender,
      };
    });
    return formatedMovies;
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('ID inválido');
    }
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: {
        gender: true,
      },
    });
    console.log('Resultado da busca:', movie);
    if (!movie) throw new NotFoundException('Filme não encontrado');
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      poster: movie.poster,
      gender: movie.gender.gender,
    };
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: { gender: true },
    });
    if (!movie) throw new NotFoundException('Filme não encontrado');

    Object.assign(movie, updateMovieDto);

    await this.movieRepository.save(movie);
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      poster: movie.poster,
      gender: movie.gender.gender,
    };
  }

  async remove(id: string) {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: { gender: true },
    });
    if (!movie) throw new NotFoundException('Filme não encontrado');
    const removedMovie = await this.movieRepository.remove(movie);
    return { message: 'Filme removido com sucesso', removedMovie };
  }
}
