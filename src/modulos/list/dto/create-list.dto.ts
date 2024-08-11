import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da lista não pode ser vazio' })
  name: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O id do usuario não pode ser vazio' })
  userId: string;
}
