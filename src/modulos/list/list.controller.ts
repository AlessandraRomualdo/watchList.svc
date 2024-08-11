import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    return await this.listService.create(createListDto);
  }

  @Get()
  async findAll() {
    return await this.listService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.listService.findOne(id);
  }

  @Get('/user/:userId')
  async findUserLists(@Param('userId') userId: string) {
    return await this.listService.findUserLists(userId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    const list = await this.listService.findOne(id);
    if (!list) return;
    return await this.listService.update(id, updateListDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const list = await this.listService.findOne(id);
    if (!list) return;
    return await this.listService.remove(id);
  }
}
