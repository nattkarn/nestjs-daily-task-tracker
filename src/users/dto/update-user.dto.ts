// src/users/dto/update-user.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {



  @ApiProperty({
    description: 'The user’s Name',
    example: 'John Doe',
  })
  @IsOptional() // This makes the field optional during update
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiProperty({
    description: 'The user’s Telephone number',
    example: '0123456789',
  })
  @IsOptional()
  @IsString({ message: 'Telephone number must be a string' })
  tel?: string;
}
