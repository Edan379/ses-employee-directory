import {
  IsArray,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsEmail()
  workEmail!: string;

  @IsOptional()
  @IsString()
  workPhone?: string;

  @IsOptional()
  @IsEmail()
  personalEmail?: string;

  @IsOptional()
  @IsString()
  personalPhone?: string;

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsIn(['Active', 'Inactive'])
  employmentStatus!: string;

  @IsIn(['Full-time', 'Part-time'])
  employmentType!: string;

  @IsInt()
  @Min(1)
  @Max(40)
  hoursPerWeek!: number;

  @IsArray()
  @IsString({ each: true })
  departments!: string[];

  @IsArray()
  @IsString({ each: true })
  titles!: string[];
}