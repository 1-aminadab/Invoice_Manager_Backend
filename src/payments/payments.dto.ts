/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDecimal,  IsNotEmpty, IsString} from 'class-validator';

export class CreatePaymentDto {
    @ApiProperty({ example: 1, description: 'Name of the tax' })
    @IsNotEmpty()
    payment_added_by: number;

    @ApiProperty({ example: '2023-05-22' })
    @IsNotEmpty()
    payment_date: Date;
  
    @ApiProperty({ example: 100.00 })

    @IsNotEmpty()
    payment_amount: number;
  
    @ApiProperty({ example: 'Credit Card' })
    @IsString()
    @IsNotEmpty()
    payment_method: string;
  
    @ApiProperty({ example: 'Completed' })
    @IsString()
    @IsNotEmpty()
    payment_status: string;
  }
  