// src/users/dto/update-user.dto.ts
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BandedUserDto {

  @ApiProperty({
    description: 'The user’s email',
    example: 'w5lTQ@example.com',
  })
  @IsEmail({}, { message: 'Email must be a required' })
  email: string;


  @ApiProperty({
    description: 'The user’s status to confirm the user banded',
    example: 'true or false',
  })
  @IsBoolean({ message: 'Confirmation banded must be a boolean' })
  confirm: boolean;

}
