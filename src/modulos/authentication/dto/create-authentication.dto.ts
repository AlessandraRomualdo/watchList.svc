import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty()
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
