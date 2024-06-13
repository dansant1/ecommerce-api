// src/auth/application/dtos/login.dto.ts

import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  @MaxLength(20, { message: 'Username must be less than or equal to 20 characters long' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
