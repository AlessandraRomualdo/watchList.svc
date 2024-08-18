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

  @Get()
  async findAll() {
    const movies = await this.movieService.findAll();
    return movies;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    return movie;
  }

  @UseGuards(AuthenticationGuard, AdminGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @UseGuards(AuthenticationGuard, AdminGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const movie = await this.movieService.update(id, updateMovieDto);
    return movie;
  }

  @UseGuards(AuthenticationGuard, AdminGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    if (!movie) return;
    return await this.movieService.remove(id);
  }
}
