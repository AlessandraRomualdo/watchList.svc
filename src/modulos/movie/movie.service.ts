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
  async findAll(
    title?: string, // filtro opcional por título
    gender?: string, // filtro opcional por gênero
    orderBy: 'asc' | 'desc' = 'asc', // ordenação opcional
  ): Promise<ApiResponse<MovieEntity[]>> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    // Adiciona relação com o gênero
    queryBuilder.leftJoinAndSelect('movie.gender', 'gender');

    // Filtro por título, se fornecido
    if (title) {
      queryBuilder.andWhere('LOWER(movie.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    // Filtro por gênero, se fornecido
    if (gender) {
      queryBuilder.andWhere('gender.gender = :gender', { gender });
    }

    if (orderBy) {
      const sortOrder = orderBy === 'desc' ? 'DESC' : 'ASC';
      queryBuilder.orderBy('movie.title', sortOrder);
    }

    const movies = await queryBuilder.getMany();

    if (!movies || movies.length === 0) {
      throw new NotFoundException('Nenhum filme encontrado');
    }

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

  // metodo para pesquisar um filme pelo nome
  async findByTitle(title: string): Promise<ApiResponse<MovieEntity[]>> {
    const movies = await this.movieRepository
      .createQueryBuilder('movie')
      .where('LOWER(movie.title) LIKE LOWER(:title)', { title: `%${title}%` })
      .getMany();
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
