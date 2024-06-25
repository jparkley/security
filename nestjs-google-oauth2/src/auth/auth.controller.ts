import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './passport/google-auth-guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  login() {
    return { msg: 'goole oauth' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect() {
    return { msg: 'redirected' };
  }

  @Get('user')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'User Authenticated' };
    } else {
      return { msg: 'User not Authenticated' };
    }
  }
}
