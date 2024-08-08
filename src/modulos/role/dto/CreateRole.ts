import { IsNotEmpty } from 'class-validator';

export class CreateRoleDTO {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;
}
