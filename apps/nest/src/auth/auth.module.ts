import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user';




@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.register({})],
  providers: [
    AuthResolver, 
    AuthService, 
    JwtStrategy],
})
export class AuthModule {}
