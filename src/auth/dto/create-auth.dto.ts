




import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsEmail, IsBoolean, IsOptional, IsInt, IsUUID } from 'class-validator';



export class CreateAuthDto {

    @ApiProperty({
        description: 'The user’s username',
        example: 'John Doe',
      })
    // Ensure 'username' is a non-empty string
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The user’s email',
        example: 'w5lTQ@example.com',
      })
    // Ensure 'email' is a valid email address
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The user’s password',
        example: 'password123',
      })
    // Ensure 'password' is a non-empty string
    @IsString()
    password: string;

    @ApiProperty({
        description: 'The user’s provider',
        example: 'local or google',
      })
    // 'provider' is optional but if present, ensure it's a string
    @IsOptional()
    @IsString()
    provider?: string;

    @ApiProperty({
        description: 'The user’s name',
        example: 'John Doe',
      })
    // 'name' is optional but if present, ensure it's a string
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'The user’s phone number',
        example: '0123456789',
      })
    // 'tel' is optional but if present, ensure it's a string
    @IsOptional()
    @IsString()
    tel?: string;

    @ApiProperty({
        description: 'The user’s token',
        example: 'token123',
      })
    // 'Token' is optional but if present, ensure it's a string
    @IsOptional()
    @IsString()
    Token?: string;

    @ApiProperty({
        description: 'The user’s resetPasswordToken',
        example: ' token123',
      })
    // 'resetPasswordToken' is optional but if present, ensure it's a string
    @IsOptional()
    @IsString()
    resetPasswordToken?: string;
      
    // 'confirmationToken' is optional but if present, ensure it's a string
    @IsOptional()
    @IsString()
    confirmationToken?: string;

    // Ensure 'confirmed' is a boolean value
    @IsBoolean()
    @IsOptional()
    confirmed?: boolean;

    // Ensure 'blocked' is a boolean value
    @IsBoolean()
    @IsOptional()
    blocked?: boolean;

    // Ensure 'roleId' is an integer and is unique
    @IsInt()
    roleId: number;
}
