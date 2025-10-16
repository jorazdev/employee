import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SignInput {
    @Field(() => Int)
    id: number;
  
    @Field()
    email: string;
  
    @Field()
    password: string;
  
    @Field()
    firstName: string;
  
    @Field()
    lastName: string;
  
    @Field()
    avatarUrl: string
}


