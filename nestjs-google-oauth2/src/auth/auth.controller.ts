import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  login() {
    return { msg: 'goole oauth est' };
  }

  @Get('google/redirect')
  redirect() {}
}
