import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignOutput {
    @Field(() => Int)
    id: number;
  
    @Field()
    email: string;
  
    @Field()
    firstName: string;
  
    @Field()
    lastName: string;
  
    @Field()
    avatarUrl: string
}


