import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import e from 'express';

@Controller('api/tasks')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('test')
  test(){
    return this.tasksService.findOne(4, 1)
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  create(@Req() req: Request, @Body() createTaskDto: CreateTaskDto) {
  
    const userId = Number(req['user']?.['userId']);

    return this.tasksService.create(createTaskDto, userId);
  }

  @Get('get-all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  findAll(@Req() req: Request) {
    //Allow only admin users to access tasks
    const userRole = String(req['user']?.['role']);
    if (userRole.toLocaleLowerCase() !== 'admin') {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    return this.tasksService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  findById(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    //Allow only admin users and self users to access tasks
    const userId = Number(req['user']?.['userId']);
    const userRole = String(req['user']?.['role']);
    if (userRole.toLocaleLowerCase() !== 'admin') {
      if (userId !== id) {
        throw new UnauthorizedException(
          'You are not authorized to access this resource',
        );
      }
    }

    return this.tasksService.findByUserId(id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  findByUnknown(@Req() req: Request) {
    //Allow only admin users and self users to access tasks
    const userId = Number(req['user']?.['userId']);

    return this.tasksService.findByUserId(userId);
  }

  @Patch('admin/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a task By Admin' })
  @ApiResponse({ status: 200, description: 'Successfully updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  updateByAdmin(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    //Allow only admin users to access tasks
    const userRole = String(req['user']?.['role']);
    if (userRole.toLocaleLowerCase() !== 'admin') {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      )
    }
    return this.tasksService.updateByAdmin(id, updateTaskDto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Successfully updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    
    const userId = Number(req['user']?.['userId']);
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = Number(req['user']?.['userId']);
    return this.tasksService.remove(id, userId);
  }

  @Delete('admin/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a task By Admin' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token') // Specify that this route requires Bearer Token authentication
  @ApiTags('Tasks')
  removeByAdmin(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    
    return this.tasksService.removeByAdmin(id);
  }
 
}
