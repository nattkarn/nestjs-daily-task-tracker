import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserFromAdminDto } from './dto/update-user-admin.dto';
import { BandedUserDto } from './dto/banded-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }



  @Get('get-all-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiTags('users')
  findAll() {
    return this.usersService.findAll();
  }

  
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token')  // Specify that this route requires Bearer Token authentication
  @ApiTags('users')
  async getProfile(@Req() Request: Request) {


    const userId = String(Request['user']?.['userId']); // Adjust 'role' based on the actual structure of your user object

    return this.usersService.findOne(+userId);
  }

  @Get('all-user')
  @ApiTags('users')
  async getAll() {

    return this.usersService.findAll();
  }




  @Post('get-user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token')  // Specify that this route requires Bearer Token authentication
  @ApiTags('users')
  async findUser(@Req() Request: Request, @Body('email') email: string) {

    const userRole = String(Request['user']?.['role']); // Adjust 'role' based on the actual structure of your user object

    if (userRole !== 'ADMIN') {

      throw new UnauthorizedException('You are not authorized to access this resource');


    }

    return this.usersService.findUser(email);

  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token')  // Specify that this route requires Bearer Token authentication
  @ApiTags('users')
  update(@Req() req: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Extract user role and user ID from the request object
    const userRole = String(req['user']?.['role']);
    const userId = String(req['user']?.['userId']);

    // console.log('User Role:', userRole);
    // console.log('User ID:', userId);

    // Check if the user is not an admin and is trying to update another user's data
    if (userRole !== 'ADMIN' && userId !== id) {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    // Call the service to perform the update
    // Assuming this.usersService.updateUser would be the method to update the user details
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('update-admin/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token')  // Specify that this route requires Bearer Token authentication
  @ApiTags('users')
  updateAdmin(@Req() req: Request, @Param('id') id: string, @Body() updateUserFromAdminDto: UpdateUserFromAdminDto) {
    // Extract user role and user ID from the request object
    const userRole = String(req['user']?.['role']);
    const userId = String(req['user']?.['userId']);

    // console.log('User Role:', userRole);
    // console.log('User ID:', userId);

    // Check if the user is not an admin and is trying to update another user's data
    if (userRole !== 'ADMIN' && userId !== id) {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    // Call the service to perform the update
    // Assuming this.usersService.updateUser would be the method to update the user details
    return this.usersService.updateFromAdmin(+id, updateUserFromAdminDto);
  }


  @Delete('banded')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token')  // Specify that this route requires Bearer Token authentication
  @ApiTags('users')
  remove(@Req() req: Request, @Body() bandedUserDto: BandedUserDto) {

    const userRole = String(req['user']?.['role']);
    const userEmail = String(req['user']?.['email']);

    // console.log('User Role:', userRole);
    // console.log('User Email:', userEmail);
    if (userRole !== 'ADMIN' && userEmail !== bandedUserDto.email) {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    return this.usersService.banded(bandedUserDto, bandedUserDto.confirm);
  }

  @Patch('unblock')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth('access-token')  // Specify that this route requires Bearer Token authentication
  @ApiTags('users')
  unblock(@Req() req: Request, @Body() bandedUserDto: BandedUserDto) {

    const userRole = String(req['user']?.['role']);
    const userEmail = String(req['user']?.['email']);

    // console.log('User Role:', userRole);
    // console.log('User Email:', userEmail);
    if (userRole !== 'ADMIN' && userEmail !== bandedUserDto.email) {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    return this.usersService.unblock(bandedUserDto, bandedUserDto.confirm);
  }
}
