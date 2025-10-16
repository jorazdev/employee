import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbsenceService } from './absence.service';
import { Absence } from 'src/entity/absence';
import { UpdateAbsInput } from 'src/dto/update-abs';
import { UpdateAbsEmpInput } from 'src/dto/updateAbsEmp.input';
import { AbsenceEmployeOutput } from 'src/dto/absenceEmploye.output';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';


@Resolver()
export class AbsenceResolver {
  constructor(private readonly absenceService: AbsenceService) {}

  @Mutation(() => Absence)
  updateAbsence(
  @Args('updateAbsInput') updateAbsInput: UpdateAbsInput) {
    return this.absenceService.update(updateAbsInput);
  }

  @Query(() => [Absence])
  absences() {
    return this.absenceService.findAll();
  }

  @Mutation(() => AbsenceEmployeOutput)
  updateAbsenceEmployee(
  @Args('updateAbsInput') updateAbsEmpInput: UpdateAbsEmpInput) {
    return this.absenceService.updateAbsenceEmployee(updateAbsEmpInput);
  }

  @Query(() => [AbsenceEmployeOutput])
  employesAbsences() {
    return this.absenceService.employesAbsences();
  }

}
