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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Busca todos os filmes' })
  @Get()
  async findAll() {
    const movies = await this.movieService.findAll();
    return movies;
  }

  @ApiOperation({ summary: 'Busca todos os filmes de um gênero' })
  @Get('/gender/:gender')
  async findAllByGender(@Param('gender') gender: string) {
    const movies = await this.movieService.findAllByGender(gender);
    return movies;
  }

  @ApiOperation({ summary: 'Busca um filme pelo id' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    return movie;
  }

  @ApiOperation({ summary: 'Busca um filme pelo nome' })
  @Get('/title/:title')
  async findByTitle(@Param('title') title: string) {
    const movie = await this.movieService.findByTitle(title);
    return movie;
  }

  // rotas abaixo são protegidas por autenticação e autorização de administrador

  @ApiOperation({ summary: 'Cria um filme' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'Atualiza um filme pelo id' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const movie = await this.movieService.update(id, updateMovieDto);
    return movie;
  }

  @ApiOperation({ summary: 'Deleta um filme pelo id' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    if (!movie) return;
    return await this.movieService.remove(id);
  }
}
