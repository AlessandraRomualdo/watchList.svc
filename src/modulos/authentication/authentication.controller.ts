import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/create-authentication.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({ summary: 'Realiza login para usuário' })
  @Post('login')
  login(@Body() { email, password }: AuthenticationDto) {
    return this.authenticationService.login(email, password);
  }
}
