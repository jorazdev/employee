import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Absence } from './absence';

@ObjectType()
@Entity()
export class Employee {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column({ unique: true })
    personnelNumber: string;

    @OneToMany(() => Absence, (absence) => absence.employee)
    @Field(() => [Absence], { nullable: true })
    absences?: Absence[];
}