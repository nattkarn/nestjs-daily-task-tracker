// src/users/dto/update-user.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserFromAdminDto {



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


  @ApiProperty({
    description: 'The user’s flag to confirm the user banded',
    example: 'true or false',
  })
  @IsOptional()
  @IsBoolean({ message: 'Confirmation banded must be a boolean' })
  confirm?: boolean;
  

  @ApiProperty({
    description: 'The user’s status to confirm the user banded',
    example: 'true or false',
  })
  @IsOptional()
  @IsBoolean({ message: 'Confirmation blocked must be a boolean' })
  block?: boolean;
}
