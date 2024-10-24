import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  async findAll() {
    const response = await this.prisma.task.findMany({
      orderBy: { dueDate: 'asc' },
    });
    if (response.length === 0) {
      throw new NotFoundException('Tasks is Empty');
    }
    return response;
  }

  async findByUserId(userId: number) {
    const response = await this.prisma.task.findMany({
      where: { userId: userId },
      orderBy: { dueDate: 'asc' },
    });

    if (response.length === 0) {
      throw new NotFoundException(`Task with User ID ${userId} not found`);
    }
    return { message: 'ok', data: response };
  }

  async checkUserHasTask(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) {
      return false;
    }
    return true;
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateByAdmin(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findFirst({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id, userId },
      data: updateTaskDto,
    });
  }

  async removeByAdmin(id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.prisma.task.delete({
      where: { id },
    });
    return { message: 'Task has been deleted' };
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId); // ตรวจสอบว่ามี task หรือไม่
    await this.prisma.task.delete({
      where: { id },
    });
    return { message: 'Task has been deleted' };
  }
}
