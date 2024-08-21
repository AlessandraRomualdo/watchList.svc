import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ListSerieService } from './list-serie.service';
import { CreateListSerieDto } from './dto/create-list-serie.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@ApiTags('list-serie')
@Controller('list-serie')
export class ListSerieController {
  constructor(private readonly listSerieService: ListSerieService) {}

  @ApiOperation({ summary: 'Adiciona uma serie a uma lista' })
  @UseGuards(AuthenticationGuard)
  @Post()
  async addSerieAtList(@Body() createListSerieDto: CreateListSerieDto) {
    return await this.listSerieService.addSerieAtList(createListSerieDto);
  }

  @ApiOperation({ summary: 'Busca todos as series de uma lista de series' })
  @UseGuards(AuthenticationGuard)
  @Get('/:id')
  async findAll(@Param('id') id: string) {
    return await this.listSerieService.findAllMovieAtList(id);
  }

  @ApiOperation({ summary: 'Remove uma Serie de uma lista de series' })
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() body: { movieId: string }) {
    return await this.listSerieService.removeSerieAtList(id, body.movieId);
  }
}
