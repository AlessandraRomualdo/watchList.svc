import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import {
  AdminGuard,
  AuthenticationGuard,
} from '../authentication/authentication.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('gender')
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @ApiOperation({ summary: 'Cria um genero de filme ou série' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Post()
  async create(@Body() createGenderDto: CreateGenderDto) {
    return await this.genderService.create(createGenderDto);
  }

  @ApiOperation({ summary: 'Busca todos os generos de filme ou série' })
  @Get()
  async findAll() {
    return await this.genderService.findAll();
  }

  @ApiOperation({ summary: 'Busca um genero pelo id' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.genderService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza um genero pelo id' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateGenderDto: UpdateGenderDto,
  ) {
    const gender = await this.genderService.update(id, updateGenderDto);

    return gender;
  }

  @ApiOperation({ summary: 'Remove um genero pelo id' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const gender = await this.genderService.findOne(id);
    if (!gender) return;
    return await this.genderService.remove(id);
  }
}
