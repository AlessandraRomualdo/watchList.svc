import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto/CreateRole';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDTO) {
    const role = await this.roleService.create(createRoleDto);
    return role;
  }

  @Get()
  async findAll() {
    const roles = await this.roleService.findAll();
    return roles;
  }

  @Delete('/:id')
  async remove(id: string) {
    await this.roleService.remove(id);
  }
}
