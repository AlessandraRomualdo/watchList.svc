import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ListMovieService } from './list-movie.service';
import { CreateListMovieDto } from './dto/create-list-movie.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@Controller('list-movie')
export class ListMovieController {
  constructor(private readonly listMovieService: ListMovieService) {}

  // rota para adicionar um filme a uma lista de filmes
  @UseGuards(AuthenticationGuard)
  @Post()
  addMivieAtList(@Body() createListMovieDto: CreateListMovieDto) {
    return this.listMovieService.addMovieAtList(createListMovieDto);
  }

  // rota para buscar todos os filmes de uma lista de filmes
  @UseGuards(AuthenticationGuard)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const moviesAtList = await this.listMovieService.findAllMoviesAtList(id);
    return moviesAtList;
  }

  // rota para remover um filme de uma lista de filmes
  @UseGuards(AuthenticationGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string, @Body() body: { movieId: string }) {
    const { movieId } = body;
    await this.listMovieService.removeMovieAtList(id, movieId);
    return { message: 'Filme removido da lista com sucesso' };
  }
}
