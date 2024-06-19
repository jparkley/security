import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './passport/google-auth-guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  login() {
    return { msg: 'goole oauth est' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect() {}
}
