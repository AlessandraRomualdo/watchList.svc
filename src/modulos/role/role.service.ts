import { Injectable, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CreateRoleDTO } from './dto/CreateRole';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from '../../types/response.dto';
import {
  AdminGuard,
  AuthenticationGuard,
} from '../authentication/authentication.guard';

@UseGuards(AuthenticationGuard, AdminGuard)
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  // metodo para criar um role
  async create(createRoleDto: CreateRoleDTO): Promise<ApiResponse<RoleEntity>> {
    const role = new RoleEntity();
    role.role = createRoleDto.role;
    if (!role) throw new Error('Role não informado');
    await this.roleRepository.save(role);
    return { success: true, data: role };
  }

  // metodo para listar todos os roles cadastrados no sistema
  async findAll(): Promise<ApiResponse<RoleEntity[]>> {
    const roles = await this.roleRepository.find();
    if (!roles) throw new Error('Nenhum role encontrado');
    return { success: true, data: roles };
  }

  // metodo para listar um role cadastrado no sistema
  async remove(id: string): Promise<ApiResponse<RoleEntity>> {
    if (!id) throw new Error('ID inválido');
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new Error('Role não encontrado');
    await this.roleRepository.delete(id);
    return { success: true, data: role };
  }
}
