import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome do filme não pode ser vazio' })
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A descrição do filme não pode ser vazia' })
  description: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty({ message: 'A url do poster não pode ser vazia' })
  poster: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'O gênero do filme não pode ser vazio' })
  genderId: string;
}
