import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  AdminGuard,
  AuthenticationGuard,
} from '../authentication/authentication.guard';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // rota para buscar todos os filmes
  @Get()
  async findAll() {
    const movies = await this.movieService.findAll();
    return movies;
  }

  // rota para buscar todos os filmes de um gênero
  @Get('/gender/:gender')
  async findAllByGender(@Param('gender') gender: string) {
    const movies = await this.movieService.findAllByGender(gender);
    return movies;
  }

  // rota para buscar um filme pelo id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    return movie;
  }

  // rotas abaixo são protegidas por autenticação e autorização de administrador
  // rota para criar um filme
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  // rota para atualizar um filme pelo id
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const movie = await this.movieService.update(id, updateMovieDto);
    return movie;
  }

  // rota para deletar um filme pelo id
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    if (!movie) return;
    return await this.movieService.remove(id);
  }
}
