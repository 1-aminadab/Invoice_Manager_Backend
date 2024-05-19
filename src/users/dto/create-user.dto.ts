import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'hash',
    description: 'The hash',
  })
  @IsString()
  @IsNotEmpty()
  hash: string;

  @ApiProperty({
    example: 'hashRt',
    description: 'The hashRt',
  })
  @IsString()
  @IsNotEmpty()
  hashRt?: string;

  
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

