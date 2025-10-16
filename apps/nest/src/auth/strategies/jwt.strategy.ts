import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret"
    });
  }

  async validate(payload: any) {
    return { 
      sub: payload.id, 
      email: payload.email, 
      firstName: payload.firstName, 
      lastName: payload.lastName,
      avatarUrl: payload.avatarUrl
    };
  }
}
