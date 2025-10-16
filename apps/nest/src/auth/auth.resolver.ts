import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from 'src/dto/login.input';
import { LoginResponse } from 'src/dto/login.output';
import { SignInput } from 'src/dto/signin.input';
import { SignOutput } from 'src/dto/signin.output';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService) {}

  @Mutation(() => SignOutput)
  async register(@Args('input') input: SignInput) {
      return this.authService.register(input);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput) {
    const user = await this.authService.validateUser(input);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user)
  }

}
