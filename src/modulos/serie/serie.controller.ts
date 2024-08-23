import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AdminGuard,
  AuthenticationGuard,
  EditorGuard,
} from '../authentication/authentication.guard';

@ApiTags('serie')
@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @ApiOperation({ summary: 'Busca todos as series' })
  @Get()
  async findAll() {
    const series = await this.serieService.findAll();
    return series;
  }

  @ApiOperation({ summary: 'Busca todas as series de um gênero' })
  @Get('/gender/:gender')
  async findAllByGender(@Param('gender') gender: string) {
    const serie = await this.serieService.findAllByGender(gender);
    return serie;
  }

  @ApiOperation({ summary: 'Busca uma serie pelo id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.serieService.findOne(id);
  }

  @ApiOperation({ summary: 'Busca uma serie pelo nome' })
  @Get('/title/:title')
  async findByTitle(@Param('title') title: string) {
    const serie = await this.serieService.findByTitle(title);
    return serie;
  }

  // rotas abaixo são protegidas por autenticação e autorização de administrador

  @ApiOperation({ summary: 'Cria uma serie' })
  @UseGuards(AuthenticationGuard, AdminGuard, EditorGuard)
  @Post()
  async create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }

  @ApiOperation({ summary: 'Atualiza uma serie pelo id' })
  @UseGuards(AuthenticationGuard, AdminGuard, EditorGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSerieDto: UpdateSerieDto,
  ) {
    const serie = await this.serieService.update(id, updateSerieDto);
    return serie;
  }

  @ApiOperation({ summary: 'Deleta uma serie pelo id' })
  @UseGuards(AuthenticationGuard, AdminGuard, EditorGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const serie = await this.serieService.findOne(id);
    if (!serie) return;
    return this.serieService.remove(id);
  }
}
