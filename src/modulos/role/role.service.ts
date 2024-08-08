import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CreateRoleDTO } from './dto/CreateRole';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDTO): Promise<RoleEntity> {
    const role = new RoleEntity();
    role.role = createRoleDto.role;
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
