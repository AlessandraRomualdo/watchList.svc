import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia' })
  birthDate: string;

  @IsString()
  @IsNotEmpty({ message: 'A role não pode ser vazia' })
  roleId: string;
}
