import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
// import { UpdateGenderDto } from './dto/update-gender.dto';
import { Repository } from 'typeorm';
import { GenderEntity } from './gender.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  // findAll() {
  //   return `This action returns all gender`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} gender`;
  // }

  // update(id: number, updateGenderDto: UpdateGenderDto) {
  //   return `This action updates a #${id} gender`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} gender`;
  // }
}
