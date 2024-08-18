import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome da lista não pode ser vazio' })
  name: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'O id do usuario não pode ser vazio' })
  userId: string;
}
