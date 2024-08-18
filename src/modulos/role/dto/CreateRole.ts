import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  role: string;
}
