import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import {
  AuthenticationGuard,
  RequestWithUser,
} from '../authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createListDto: CreateListDto,
  ) {
    const userId = req.user.sub;
    console.log(userId);
    return await this.listService.create({ ...createListDto, userId });
  }

  @Get()
  async findAll() {
    return await this.listService.findAll();
  }

  // rota para buscar uma lista pelo id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.listService.findOne(id);
  }

  // rota para buscar todas as listas de um usuário
  @Get('/user/:userId')
  async findUserLists(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return await this.listService.findUserLists(userId);
  }

  // rota para atualizar uma lista pelo id
  @Patch()
  async update(
    @Query('id') id: string,
    @Body() { name }: UpdateListDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user.sub;
    const list = await this.listService.findOne(id);
    if (!list) return;
    return await this.listService.update(id, { name, userId: user });
  }

  // rota para deletar uma lista pelo id
  @Delete()
  async remove(@Query('id') id: string) {
    const list = await this.listService.findOne(id);
    if (!list) return;
    return await this.listService.remove(id);
  }
}
