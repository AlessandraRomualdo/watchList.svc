import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HasherPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}
  async transform(password: string): Promise<string> {
    // aqui você pode usar o bcrypt para encriptar a senha do usuário antes de salvar no banco
    const sal = this.configService.get<string>('SALT');
    // o valor de sal é opcional, mas é recomendado que você use um valor de sal para encriptar a senha
    const hashedPassword = await bcrypt.hash(password, sal);
    return hashedPassword;
  }
}
