import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HasherPasswordPipe } from 'src/pipes/hasher-password';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...createUserDto }: CreateUserDto,
    // usando o pipe para encriptar a senha do usuário antes de salvar no banco
    @Body('password', HasherPasswordPipe) hashedPassord: string,
  ) {
    return await this.userService.create({
      ...createUserDto,
      password: hashedPassord,
    });
  }

  @Post('/admin')
  async createAdmin(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...createUserDto }: CreateUserDto,
    // usando o pipe para encriptar a senha do usuário antes de salvar no banco
    @Body('password', HasherPasswordPipe) hashedPassord: string,
  ) {
    return await this.userService.createAdmin({
      ...createUserDto,
      password: hashedPassord,
    });
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(id);
    if (!user) return;
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) return;
    return await this.userService.remove(id);
  }
}
