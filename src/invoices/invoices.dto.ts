/* eslint-disable prettier/prettier */
   import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceDto {
    @ApiProperty({ example: 'INV-12345' })
    @IsString()
    @IsNotEmpty()
    invoice_number: string;
  
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    from_customer_id: number;
  
    @ApiProperty({ example: 2 })
    @IsInt()
    @IsNotEmpty()
    to_customer_id: number;
  
    @ApiProperty({ example: '2023-05-22' })
    @IsDate()
    @IsNotEmpty()
    date_issued: Date;
  
    @ApiProperty({ example: '2023-06-22' })
    @IsDate()
    @IsNotEmpty()
    due_date: Date;
  
    @ApiProperty({ example: 'Pending' })
    @IsString()
    @IsNotEmpty()
    status: string;
  
    @ApiProperty({ example: 120.00 })
    @IsDecimal()
    @IsNotEmpty()
    total_amount: number;
  
    @ApiProperty({ example: 20.00 })
    @IsDecimal()
    @IsNotEmpty()
    tax_amount: number;
  
    @ApiProperty({ example: 100.00 })
    @IsDecimal()
    @IsNotEmpty()
    subtotal: number;
  
    @ApiProperty({ type: [CreateInvoiceItemDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateInvoiceItemDto)
    invoice_items: CreateInvoiceItemDto[];
  
    @ApiProperty({ type: CreatePaymentDto })
    @ValidateNested()
    @Type(() => CreatePaymentDto)
    payment: CreatePaymentDto;
  }