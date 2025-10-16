import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbsenceEmployeOutput {
    @Field()
    abscenceId: string;
    
    @Field()
    firstName: string;
  
    @Field()
    lastName: string;
    
    @Field()
    personnelNumber: string;

    @Field(() => String)
    startDate: Date;

    @Field(() => String)
    endDate: Date;
}
