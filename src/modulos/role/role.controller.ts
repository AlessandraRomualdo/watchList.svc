import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto/CreateRole';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AdminGuard,
  AuthenticationGuard,
} from '../authentication/authentication.guard';

@ApiTags('role')
@UseGuards(AuthenticationGuard, AdminGuard)
@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Cria uma role' })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDTO) {
    const role = await this.roleService.create(createRoleDto);
    return role;
  }

  @ApiOperation({ summary: 'Retorna todas as role' })
  @Get()
  async findAll() {
    const roles = await this.roleService.findAll();
    return roles;
  }

  @ApiOperation({ summary: 'Deleta uma role pelo id' })
  @Delete('/:id')
  async remove(id: string) {
    await this.roleService.remove(id);
  }
}
