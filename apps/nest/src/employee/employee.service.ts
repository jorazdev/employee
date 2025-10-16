import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEmpInput } from 'src/dto/update-emp.input';
import { Employee } from 'src/entity/employee';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

    updateEmployee(updateEmpInput: UpdateEmpInput){
        const employee = this.employeeRepository.create(updateEmpInput);
        return this.employeeRepository.save(employee);
    }

    findAll(){
        return this.employeeRepository.find()
    }
}
