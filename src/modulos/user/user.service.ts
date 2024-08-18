import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { isUUID } from 'class-validator';
import { ApiResponse } from '../../types/response.dto';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  // metodo para criar um usuário
  async create(createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
    const user = new UserEntity();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.birthDate = createUserDto.birthDate;
    const role = await this.roleRepository.findOne({ where: { role: 'user' } });
    user.role = role;
    if (!user) throw new Error('Usuário não informado');
    await this.userRepository.save(user);
    return { success: true, data: user };
  }

  // medoto para criar um usuário administrador
  async createAdmin(
    createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserEntity>> {
    const user = new UserEntity();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.birthDate = createUserDto.birthDate;
    const role = await this.roleRepository.findOne({
      where: { role: 'admin' },
    });
    user.role = role;
    if (!user) throw new Error('Usuário não informado');
    await this.userRepository.save(user);
    return { success: true, data: user };
  }

  // metodo para listar todos os usuários cadastrados no sistema
  async findAll(): Promise<ApiResponse<UserEntity[]>> {
    const users = await this.userRepository.find();
    if (!users) throw new Error('Nenhum usuário encontrado');
    return { success: true, data: users };
  }

  // metodo para listar um usuário cadastrado no sistema
  async findOne(id: string): Promise<ApiResponse<UserEntity>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');
    return { success: true, data: user };
  }

  // metodo para listar um usuário cadastrado no sistema pelo email
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) throw new Error('Usuário não encontrado');
    return { success: true, data: user };
  }

  // metodo para atualizar um usuário cadastrado no sistema
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserEntity>> {
    if (!isUUID(id)) throw new Error('ID inválido');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return { success: true, data: user };
  }

  // metodo para remover um usuário cadastrado no sistema
  async remove(id: string): Promise<ApiResponse<UserEntity>> {
    if (!isUUID(id)) throw new Error('ID inválido');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');
    const deletedUser = await this.userRepository.remove(user);
    return { success: true, data: deletedUser };
  }
}
