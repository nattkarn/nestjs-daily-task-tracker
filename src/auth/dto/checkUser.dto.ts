

import { ApiProperty } from '@nestjs/swagger';




import { IsEmail } from 'class-validator';



export class CheckUserDto {

    @ApiProperty({
        description: 'The user’s Email',
        example: 'w5lTQ@example.com',
      })
    // Ensure 'email' is a valid email address
    @IsEmail()
    email: string;

}
