import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginInput } from 'src/dto/login.input';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
          usernameField: 'identity',
        });
      }
    
      validate(indentity: string, password: string) {
        if (password === '')
        throw new UnauthorizedException('Please Provide The Password');
        const payload: LoginInput = {
          email: indentity,
          password
        }
        return this.authService.validateUser(payload);
      }
}