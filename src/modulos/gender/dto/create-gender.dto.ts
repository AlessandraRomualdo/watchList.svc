import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O gender não pode ser vazio' })
  gender: string;
}
