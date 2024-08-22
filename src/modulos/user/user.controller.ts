import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HasherPasswordPipe } from 'src/pipes/hasher-password';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AdminGuard,
  AuthenticationGuard,
} from '../authentication/authentication.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cria um novo usuário' })
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

  @ApiOperation({ summary: 'Cria um usuário adm' })
  @UseGuards(AuthenticationGuard, AdminGuard)
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

  @ApiOperation({ summary: 'Cria um usuário editor' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Post('/editor')
  async createEditor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...createUserDto }: CreateUserDto,
    // usando o pipe para encriptar a senha do usuário antes de salvar no banco
    @Body('password', HasherPasswordPipe) hashedPassord: string,
  ) {
    return await this.userService.createEditor({
      ...createUserDto,
      password: hashedPassord,
    });
  }

  @ApiOperation({ summary: 'Lista todos os usuários' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Busca um usuário pelo id' })
  @UseGuards(AuthenticationGuard)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza os dados de um usuário pelo id' })
  @UseGuards(AuthenticationGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(id);
    if (!user) return;
    return await this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Deleta um usuário pelo id' })
  @UseGuards(AuthenticationGuard, AdminGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) return;
    return await this.userService.remove(id);
  }
}
