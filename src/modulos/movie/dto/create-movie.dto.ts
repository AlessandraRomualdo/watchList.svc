import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do filme não pode ser vazio' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição do filme não pode ser vazia' })
  description: string;

  @IsUrl()
  @IsNotEmpty({ message: 'A url do poster não pode ser vazia' })
  poster: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O gênero do filme não pode ser vazio' })
  genderId: string;
}
