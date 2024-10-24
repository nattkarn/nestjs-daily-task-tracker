// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { Priority, Status } from '@prisma/client';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  status: Status;

  @IsDateString()
  dueDate: Date;
}
