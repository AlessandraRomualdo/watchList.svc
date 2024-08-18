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

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  // rota para criar um gênero
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Post()
  async create(@Body() createGenderDto: CreateGenderDto) {
    return await this.genderService.create(createGenderDto);
  }

  // rota para buscar todos os gêneros
  @Get()
  async findAll() {
    return await this.genderService.findAll();
  }

  // rota para buscar um gênero pelo id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.genderService.findOne(id);
  }

  // rota para atualizar um gênero pelo id
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateGenderDto: UpdateGenderDto,
  ) {
    const gender = await this.genderService.update(id, updateGenderDto);

    return gender;
  }

  // rota para remover um gênero pelo id
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const gender = await this.genderService.findOne(id);
    if (!gender) return;
    return await this.genderService.remove(id);
  }
}
