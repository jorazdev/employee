import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAbsInput {
  @Field()
  employeeId: string;

  @Field(() => String)
  startDate: Date;

  @Field(() => String)
  endDate: Date;
  
  @Field()
  reason: string;
}
