import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/entity/employee';
import { UpdateEmpInput } from 'src/dto/update-emp.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  updateEmployee(
  @Args('UpdateEmpInput') updateEmpInput: UpdateEmpInput
  ) {
  return this.employeeService.updateEmployee(updateEmpInput);
  }

  @Query(() => [Employee])
  employees() {
    return this.employeeService.findAll();
  }
}
