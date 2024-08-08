import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  async create(@Body() createGenderDto: CreateGenderDto) {
    return await this.genderService.create(createGenderDto);
  }

  @Get()
  async findAll() {
    return await this.genderService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.genderService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateGenderDto: UpdateGenderDto,
  ) {
    const gender = await this.genderService.update(id, updateGenderDto);

    return gender;
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const gender = await this.genderService.findOne(id);
    if (!gender) return;
    return await this.genderService.remove(id);
  }
}
