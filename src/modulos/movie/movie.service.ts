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
import { ApiResponse } from '../../types/response.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(GenderEntity)
    private readonly genderRepository: Repository<GenderEntity>,
  ) {}

  // metodo para criar um filme
  async create(
    createMovieDto: CreateMovieDto,
  ): Promise<ApiResponse<CreateMovieDto>> {
    const gender = await this.genderRepository.findOne({
      where: { id: createMovieDto.genderId },
    });
    if (!gender) throw new Error('Gênero não encontrado');
    const movie = new MovieEntity();
    movie.title = createMovieDto.title;
    movie.description = createMovieDto.description;
    movie.poster = createMovieDto.poster;
    movie.gender = gender;
    await this.movieRepository.save(movie);
    return { success: true, data: createMovieDto };
  }

  // metodo para listar todos os filmes cadastrados no sistema
  async findAll(): Promise<ApiResponse<MovieEntity[]>> {
    const movies = await this.movieRepository.find({
      relations: {
        gender: true,
      },
    });
    if (!movies) throw new NotFoundException('Nenhum filme encontrado');
    return { success: true, data: movies };
  }

  // metodo para listar todos os filmes cadastrados no sistema por gênero
  async findAllByGender(gender: string): Promise<ApiResponse<MovieEntity[]>> {
    const movies = await this.movieRepository.find({
      relations: { gender: true },
      where: { gender: { gender } },
    });
    if (!movies) throw new NotFoundException('Nenhum filme encontrado');
    return { success: true, data: movies };
  }

  // metodo para listar um filme cadastrado no sistema pelo id
  async findOne(id: string): Promise<ApiResponse<MovieEntity>> {
    if (!isUUID(id)) {
      throw new BadRequestException('ID inválido');
    }
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: {
        gender: true,
      },
    });
    if (!movie) throw new NotFoundException('Filme não encontrado');
    return { success: true, data: movie };
  }

  // metodo para atualizar um filme cadastrado no sistema
  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<ApiResponse<UpdateMovieDto>> {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: { gender: true },
    });
    if (!movie) throw new NotFoundException('Filme não encontrado');

    Object.assign(movie, updateMovieDto);

    await this.movieRepository.save(movie);
    return { success: true, data: updateMovieDto };
  }

  // metodo para remover um filme cadastrado no sistema
  async remove(id: string): Promise<ApiResponse<MovieEntity>> {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: { gender: true },
    });
    if (!movie) throw new NotFoundException('Filme não encontrado');
    const removedMovie = await this.movieRepository.remove(movie);
    return { success: true, data: removedMovie };
  }
}
