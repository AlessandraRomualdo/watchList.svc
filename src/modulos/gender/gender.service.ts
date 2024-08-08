import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Repository } from 'typeorm';
import { GenderEntity } from './gender.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(GenderEntity)
    private readonly genderRepository: Repository<GenderEntity>,
  ) {}

  async create(createGenderDto: CreateGenderDto) {
    const gender = new GenderEntity();
    gender.gender = createGenderDto.gender;
    return this.genderRepository.save(gender);
  }

  async findAll() {
    const genders = await this.genderRepository.find();
    return genders;
  }

  async findOne(id: string) {
    const gender = await this.genderRepository.findOne({ where: { id } });
    return gender;
  }

  async update(id: string, updateGenderDto: UpdateGenderDto) {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) throw new NotFoundException('Gênero não encontrado');

    Object.assign(gender, updateGenderDto);
    await this.genderRepository.save(gender);
    return gender;
  }

  async remove(id: string) {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) throw new NotFoundException('Gênero não encontrado');
    const deletedGender = await this.genderRepository.remove(gender);
    return { message: 'Gênero removido com sucesso', deletedGender };
  }
}
