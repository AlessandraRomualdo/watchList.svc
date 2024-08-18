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
  AdminGuard,
  AuthenticationGuard,
  RequestWithUser,
} from '../authentication/authentication.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('list')
@UseGuards(AuthenticationGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @ApiOperation({ summary: 'Cria uma lista de filmes ou séries de um usuário' })
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createListDto: CreateListDto,
  ) {
    const userId = req.user.sub;
    console.log(userId);
    return await this.listService.create({ ...createListDto, userId });
  }

  @ApiOperation({ summary: 'Busca uma lista pelo id' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.listService.findOne(id);
  }

  @ApiOperation({ summary: 'Busca todas as listas de um usuário' })
  @Get('/user/:userId')
  async findUserLists(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return await this.listService.findUserLists(userId);
  }

  @ApiOperation({ summary: 'Atualiza uma lista pelo id' })
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

  @ApiOperation({ summary: 'Remove uma lista pelo id' })
  @Delete()
  async remove(@Query('id') id: string) {
    const list = await this.listService.findOne(id);
    if (!list) return;
    return await this.listService.remove(id);
  }

  @ApiOperation({
    summary: 'Busca todas as listas de filmes ou séries da aplicação',
  })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Get()
  async findAll() {
    return await this.listService.findAll();
  }
}
