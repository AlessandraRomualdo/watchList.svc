import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia' })
  birthDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A role não pode ser vazia' })
  roleId: string;
}
