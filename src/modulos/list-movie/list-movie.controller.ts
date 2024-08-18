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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('list-movie')
@Controller('list-movie')
export class ListMovieController {
  constructor(private readonly listMovieService: ListMovieService) {}

  @ApiOperation({ summary: 'Adiciona um filme a uma lista' })
  @UseGuards(AuthenticationGuard)
  @Post()
  addMivieAtList(@Body() createListMovieDto: CreateListMovieDto) {
    return this.listMovieService.addMovieAtList(createListMovieDto);
  }

  @ApiOperation({ summary: 'Busca todos os fimes de uma lista de filmes' })
  @UseGuards(AuthenticationGuard)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const moviesAtList = await this.listMovieService.findAllMoviesAtList(id);
    return moviesAtList;
  }

  @ApiOperation({ summary: 'Remove um filme de uma lista de filmes' })
  @UseGuards(AuthenticationGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string, @Body() body: { movieId: string }) {
    const { movieId } = body;
    await this.listMovieService.removeMovieAtList(id, movieId);
    return { message: 'Filme removido da lista com sucesso' };
  }
}
