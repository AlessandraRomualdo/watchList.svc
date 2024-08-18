import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListSerieService } from './list-serie.service';
import { CreateListSerieDto } from './dto/create-list-serie.dto';
import { UpdateListSerieDto } from './dto/update-list-serie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('list-serie')
@Controller('list-serie')
export class ListSerieController {
  constructor(private readonly listSerieService: ListSerieService) {}

  @Post()
  create(@Body() createListSerieDto: CreateListSerieDto) {
    return this.listSerieService.create(createListSerieDto);
  }

  @Get()
  findAll() {
    return this.listSerieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listSerieService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListSerieDto: UpdateListSerieDto,
  ) {
    return this.listSerieService.update(+id, updateListSerieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listSerieService.remove(+id);
  }
}
