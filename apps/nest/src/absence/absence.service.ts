import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsenceEmployeOutput } from 'src/dto/absenceEmploye.output';
import { UpdateAbsInput } from 'src/dto/update-abs';
import { UpdateAbsEmpInput } from 'src/dto/updateAbsEmp.input';
import { Absence } from 'src/entity/absence';
import { Employee } from 'src/entity/employee';
import { Repository } from 'typeorm';

@Injectable()
export class AbsenceService {

    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Absence) private absenceRepository: Repository<Absence>
    ){}

    async update(updateAbsInput: UpdateAbsInput): Promise<Absence> {
        const employee = await this.employeeRepository.findOneBy({ id: updateAbsInput.employeeId });

        const absence = this.absenceRepository.create(updateAbsInput)
        if(employee){
            absence.employee = employee
        }
        return this.absenceRepository.save(absence);
    }

    async findAll() {
        return this.absenceRepository.find({
            relations: ['employee']
        });
    }

    async generatePersonnelNumber(): Promise<string> {
        const [lastEmployee] = await this.employeeRepository.find({
          order: { personnelNumber: 'DESC' },
          take: 1,  // Limit to 1 record
        });
      
        let nextNumber = 1;
      
        if (lastEmployee?.personnelNumber) {
          const match = lastEmployee.personnelNumber.match(/mat-(\d+)/);
          if (match) {
            nextNumber = parseInt(match[1], 10) + 1;
          }
        }
        return `mat-${nextNumber.toString().padStart(5, '0')}`;
    }

    async updateAbsenceEmployee(updateAbsEmpInput: UpdateAbsEmpInput): Promise<AbsenceEmployeOutput>{
        let absence = await this.absenceRepository.findOne({
            where: {id: updateAbsEmpInput.abscenceId},
            relations: ['employee'] 
        })

        if(!absence){
            let employee = this.employeeRepository.create({
                firstName: updateAbsEmpInput.firstName,
                lastName: updateAbsEmpInput.lastName,
                personnelNumber: await this.generatePersonnelNumber()
              })
            employee = await this.employeeRepository.save(employee)
            
            absence = this.absenceRepository.create({
                startDate: updateAbsEmpInput.startDate,
                endDate: updateAbsEmpInput.endDate,
                employee
            })
        }else{
            absence.startDate = updateAbsEmpInput.startDate
            absence.endDate = updateAbsEmpInput.endDate
        }
        absence = await this.absenceRepository.save(absence)

        return {
            abscenceId: absence.id,
            firstName: absence.employee.firstName,
            lastName: absence.employee.lastName,
            personnelNumber: absence.employee.personnelNumber,
            startDate: absence.startDate,
            endDate: absence.endDate
        }
    }

    async employesAbsences(): Promise<AbsenceEmployeOutput[]>{
        const absences = await this.absenceRepository.find({
            relations: ['employee'],
            order: {
                employee: {
                    personnelNumber: 'ASC'
                }
            }
        })

        const absenceEmployeOutput: AbsenceEmployeOutput[] = []

        for (const absence of absences) {
            absenceEmployeOutput.push({
              abscenceId: absence.id,
              firstName: absence.employee.firstName,
              lastName: absence.employee.lastName,
              personnelNumber: absence.employee.personnelNumber,
              startDate: absence.startDate,
              endDate: absence.endDate,
            });
          }
        
          return absenceEmployeOutput;
    }
}
