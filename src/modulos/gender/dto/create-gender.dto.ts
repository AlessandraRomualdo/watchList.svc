import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @IsString()
  @IsNotEmpty({ message: 'O gender não pode ser vazio' })
  gender: string;
}
