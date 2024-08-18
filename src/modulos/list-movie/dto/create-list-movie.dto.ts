import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateListMovieDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'O id da Lista não pode ser vazio' })
  listId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'O id do Filme não pode ser vazio' })
  movieId: string;
}
