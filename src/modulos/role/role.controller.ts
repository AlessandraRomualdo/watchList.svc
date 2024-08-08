import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto/CreateRole';
import { RoleEntity } from './role.entity';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDTO): Promise<RoleEntity> {
    const role = await this.roleService.create(createRoleDto);
    return role;
  }

  @Get()
  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.roleService.findAll();
    return roles;
  }

  @Delete('/:id')
  async remove(id: string): Promise<void> {
    await this.roleService.remove(id);
  }
}
