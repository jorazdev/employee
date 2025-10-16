import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEmpInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
  
  @Field()
  personnelNumber: string;
}
