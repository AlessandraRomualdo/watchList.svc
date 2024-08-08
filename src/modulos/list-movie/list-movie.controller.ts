import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListMovieService } from './list-movie.service';
import { CreateListMovieDto } from './dto/create-list-movie.dto';
import { UpdateListMovieDto } from './dto/update-list-movie.dto';

@Controller('list-movie')
export class ListMovieController {
  constructor(private readonly listMovieService: ListMovieService) {}

  @Post()
  create(@Body() createListMovieDto: CreateListMovieDto) {
    return this.listMovieService.create(createListMovieDto);
  }

  @Get()
  findAll() {
    return this.listMovieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listMovieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListMovieDto: UpdateListMovieDto) {
    return this.listMovieService.update(+id, updateListMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listMovieService.remove(+id);
  }
}
