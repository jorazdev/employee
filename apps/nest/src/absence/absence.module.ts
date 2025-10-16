import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceResolver } from './absence.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entity/employee';
import { Absence } from 'src/entity/absence';

@Module({
  imports: [TypeOrmModule.forFeature([ Employee, Absence ])],
  providers: [AbsenceResolver, AbsenceService],
})
export class AbsenceModule {}
