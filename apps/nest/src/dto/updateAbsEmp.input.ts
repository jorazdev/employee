import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAbsEmpInput {

  @Field()
  abscenceId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
  
  @Field(() => String)
  startDate: Date;

  @Field(() => String)
  endDate: Date;
}
