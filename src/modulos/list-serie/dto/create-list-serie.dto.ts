import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateListSerieDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'O id da Lista não pode ser vazio' })
  listId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'O id da Serie não pode ser vazio' })
  serieId: string;
}
