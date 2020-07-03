import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from './local/local-auth.guard';
// import { RequestWithUser } from '../utils/Request';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  //Recebe os dados do usuário do request
  // TODO Tipar o parâmetro request
  async login(@Req() request) {

    return this.authService.login(request.user.user_id, request.user.email);
  }

}
