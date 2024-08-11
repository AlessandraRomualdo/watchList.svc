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
import { ApiResponse } from '../../types/response.dto';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(GenderEntity)
    private readonly genderRepository: Repository<GenderEntity>,
  ) {}

  // metodo para criar um gênero de filme
  async create(
    createGenderDto: CreateGenderDto,
  ): Promise<ApiResponse<CreateGenderDto>> {
    const gender = new GenderEntity();
    gender.gender = createGenderDto.gender;
    if (!gender) throw new BadRequestException('Gênero não informado');
    await this.genderRepository.save(gender);

    return { success: true, data: createGenderDto };
  }

  // metodo para listar todos os gêneros de filme cadastraos
  async findAll(): Promise<ApiResponse<GenderEntity[]>> {
    const genders = await this.genderRepository.find();
    if (!genders) throw new NotFoundException('Nenhum gênero encontrado');
    return { success: true, data: genders };
  }

  // metodo para listar um gênero de filme cadastrado
  async findOne(id: string): Promise<ApiResponse<GenderEntity>> {
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) throw new NotFoundException('Gênero não encontrado');
    return { success: true, data: gender };
  }

  // metodo para atualizar um gênero de filme cadastrado
  async update(
    id: string,
    updateGenderDto: UpdateGenderDto,
  ): Promise<ApiResponse<GenderEntity>> {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) throw new NotFoundException('Gênero não encontrado');

    Object.assign(gender, updateGenderDto);
    await this.genderRepository.save(gender);
    return { success: true, data: gender };
  }

  // metodo para remover um gênero de filme cadastrado
  async remove(id: string): Promise<ApiResponse<GenderEntity>> {
    if (!isUUID(id)) throw new BadRequestException('ID inválido');
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) throw new NotFoundException('Gênero não encontrado');
    const deletedGender = await this.genderRepository.remove(gender);
    return { success: true, data: deletedGender };
  }
}
