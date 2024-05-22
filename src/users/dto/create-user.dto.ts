/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: 'hash',
    description: 'The hashed refresh token',
  })
  @IsOptional()
  @IsString()
  readonly hashedRt?: string;

  @ApiProperty({
    example: '+123456789',
    description: 'The phone number of the user',
  })
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiProperty({
    example: '123 Street',
    description: 'The address of the user',
  })
  @IsOptional()
  @IsString()
  readonly address?: string;

  @ApiProperty({
    example: 'City',
    description: 'The city of the user',
  })
  @IsOptional()
  @IsString()
  readonly city?: string;

  @ApiProperty({
    example: 'Country',
    description: 'The country of the user',
  })
  @IsOptional()
  @IsString()
  readonly country?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}