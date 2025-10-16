import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from 'src/dto/login.input';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user';
import { readFileSync } from 'fs';
import { SignInput } from 'src/dto/signin.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async validateUser(input: LoginInput) {
        const user = await this.userRepository.findOne({
          where: {email: input.email}
        });
        if (!user) return null;
    
        const valid = await bcrypt.compare(input.password, user.password);
        return valid ? user : null;
    }

    async login(user: any) {
        const payload = { 
            sub: user.id, 
            email: user.email, 
            firstName: user.firstName, 
            lastName: user.lastName,
            avatarUrl: user.avatarUrl
          }
        const token = this.jwtService.sign(payload, {
          secret: 'secret',
          expiresIn: '1h'
        });
        return {
          access_token: token
        };
      }

    async register(input: SignInput) {
        const exists = await this.userRepository.findOne({
          where: {email: input.email}
        });
        if (exists) throw new UnauthorizedException('Email already in use');

        const hashed = await bcrypt.hash(input.password, 10);
        let user: User = this.userRepository.create(input);
        user.password = hashed

        user = await this.userRepository.save(user)
        const { password, ...response } = user;

        return response
    }
}
