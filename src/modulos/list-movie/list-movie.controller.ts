import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { ListMovieService } from './list-movie.service';
import { CreateListMovieDto } from './dto/create-list-movie.dto';

@Controller('list-movie')
export class ListMovieController {
  constructor(private readonly listMovieService: ListMovieService) {}

  @Post()
  addMivieAtList(@Body() createListMovieDto: CreateListMovieDto) {
    return this.listMovieService.addMovieAtList(createListMovieDto);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const moviesAtList = await this.listMovieService.findAllMoviesAtList(id);
    return moviesAtList;
  }

  @Delete('/:id')
  async remove(@Param('id') id: string, @Body() body: { movieId: string }) {
    const { movieId } = body;
    await this.listMovieService.removeMovieAtList(id, movieId);
    return { message: 'Filme removido da lista com sucesso' };
  }
}
