import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    await this.ensureActiveWorkEmailIsUnique(createEmployeeDto.workEmail);

    const employee = new this.employeeModel({
      ...createEmployeeDto,
      isActive: createEmployeeDto.employmentStatus === 'Active',
    });

    return employee.save();
  }

  async findAll() {
    return this.employeeModel.find({ isActive: true }).sort({ lastName: 1 }).exec();
  }

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id).exec();

    if (!employee || !employee.isActive) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeModel.findById(id).exec();

    if (!employee || !employee.isActive) {
      throw new NotFoundException('Employee not found');
    }

    if (updateEmployeeDto.workEmail) {
      await this.ensureActiveWorkEmailIsUnique(updateEmployeeDto.workEmail, id);
    }

    Object.assign(employee, updateEmployeeDto);

    if (updateEmployeeDto.employmentStatus === 'Inactive') {
      employee.isActive = false;
    }

    return employee.save();
  }

  async remove(id: string) {
    const employee = await this.employeeModel.findById(id).exec();

    if (!employee || !employee.isActive) {
      throw new NotFoundException('Employee not found');
    }

    employee.isActive = false;
    employee.employmentStatus = 'Inactive';

    return employee.save();
  }

  private async ensureActiveWorkEmailIsUnique(workEmail: string, currentEmployeeId?: string) {
    const existingEmployee = await this.employeeModel
      .findOne({
        workEmail: workEmail.toLowerCase(),
        isActive: true,
        ...(currentEmployeeId ? { _id: { $ne: currentEmployeeId } } : {}),
      })
      .exec();

    if (existingEmployee) {
      throw new ConflictException(
        'Work email already used by another active employee',
      );
    }
  }
}