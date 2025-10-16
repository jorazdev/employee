import { Args, Query, Resolver } from '@nestjs/graphql';
import { HelloService } from './hello.service';

@Resolver()
export class HelloResolver {
  constructor(private readonly helloService: HelloService) {}

  @Query(() => String)
  hello(@Args('name') name: string){
    return name
  }
}
