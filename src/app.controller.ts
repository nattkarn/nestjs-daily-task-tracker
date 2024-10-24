import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('Health Check')
  @HttpCode(200)
  getStatus() {
    return {
      message: 'Server Status: OK',
      status: 'Success'
    };
  }


  @Get('status')
  @ApiTags('Health Check')
  @HttpCode(200)
  getHello() {
    return this.appService.getHello();
  }
}
