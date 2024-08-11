import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateListMovieDto {
  @IsUUID()
  @IsNotEmpty({ message: 'O id da Lista não pode ser vazio' })
  listId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O id do Filme não pode ser vazio' })
  movieId: string;
}
