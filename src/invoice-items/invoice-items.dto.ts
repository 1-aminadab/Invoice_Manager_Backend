/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  IsDecimal, IsInt, IsNotEmpty} from 'class-validator';

export class CreateInvoiceItemDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    product_id: number;
  
    @ApiProperty({ example: 2 })
    @IsInt()
    @IsNotEmpty()
    quantity: number;
  
    @ApiProperty({ example: 50.00 })
    
    @IsNotEmpty()
    unit_price: number;
  
    @ApiProperty({ example: 100.00 })
    @IsNotEmpty()
    total_price: number;
  }