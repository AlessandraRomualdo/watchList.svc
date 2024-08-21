import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateSerieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome da serie não pode ser vazio' })
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A descrição da serie não pode ser vazia' })
  description: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty({ message: 'A url do poster não pode ser vazia' })
  poster: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'O gênero da serie não pode ser vazio' })
  genderId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'A quantidade de temporada não pode ser vazia' })
  seasons: number;
}
