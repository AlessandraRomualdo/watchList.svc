import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

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

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const movie = await this.movieService.update(id, updateMovieDto);
    return movie;
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    if (!movie) return;
    return await this.movieService.remove(id);
  }
}
