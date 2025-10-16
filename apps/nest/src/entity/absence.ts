import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType()
@Entity()
export class Absence {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({ type: 'date' })
    startDate: Date;

    @Field(() => String)
    @Column({ type: 'date' })
    endDate: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    reason?: string;

    @ManyToOne(() => Employee, (employee) => employee.absences, { onDelete: 'CASCADE' })
    @Field(() => Employee)
    employee: Employee;

}