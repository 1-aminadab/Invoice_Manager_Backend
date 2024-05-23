/* eslint-disable prettier/prettier */
   import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInvoiceItemDto } from 'src/invoice-items/invoice-items.dto';
import { CreatePaymentDto } from 'src/payments/payments.dto';

export class CreateInvoiceDto {
    @ApiProperty({ example: 'INV-12345' })
    @IsString()
    @IsNotEmpty()
    invoice_number: string;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    from_customer_id: number;
  
    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    to_customer_id: number;
  
    @ApiProperty({ example: '2023-05-22' })
    @IsNotEmpty()
    date_issued: Date;
  
    @ApiProperty({ example: '2023-06-22' })
    @IsNotEmpty()
    due_date: Date;
  
    @ApiProperty({ example: 'Pending' })
    @IsString()
    @IsNotEmpty()
    status: string;
  
    @ApiProperty({ example: 120.00 })
    @IsNotEmpty()
    total_amount: number;
  
    @ApiProperty({ example: 20.00 })
    @IsNotEmpty()
    tax_amount: number;
  
    @ApiProperty({ example: 100.00 })
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
  export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto){}