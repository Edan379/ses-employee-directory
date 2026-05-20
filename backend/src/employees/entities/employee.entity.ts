import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({ required: true, trim: true })
  lastName!: string;

  @Prop({ trim: true })
  middleName?: string;

  @Prop({ required: true, lowercase: true, trim: true })
  workEmail!: string;

  @Prop({ trim: true })
  workPhone?: string;

  @Prop({ lowercase: true, trim: true })
  personalEmail?: string;

  @Prop({ trim: true })
  personalPhone?: string;

  @Prop({ required: true })
  startDate!: Date;

  @Prop()
  endDate?: Date;

  @Prop({ required: true, enum: ['Active', 'Inactive'], default: 'Active' })
  employmentStatus!: string;

  @Prop({ required: true, enum: ['Full-time', 'Part-time'] })
  employmentType!: string;

  @Prop({ required: true, min: 1, max: 40 })
  hoursPerWeek!: number;

  @Prop({ type: [String], default: [] })
  departments!: string[];

  @Prop({ type: [String], default: [] })
  titles!: string[];

  @Prop({ default: true })
  isActive!: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);