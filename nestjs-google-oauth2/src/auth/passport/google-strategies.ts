import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('GCP_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GCP_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GCP_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('args in validate', accessToken, refreshToken, profile);
  }
}
