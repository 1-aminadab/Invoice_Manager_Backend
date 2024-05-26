/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 1, description: 'Name of the tax' })
  @IsNotEmpty()
  product_added_by: number;

  @ApiProperty({ example: 'Laptop', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @ApiProperty({ example: 'High performance laptop', description: 'Description of the product' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 999.99, description: 'Price of the product' })
  
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 1, description: 'Tax ID associated with the product' })
  @IsInt()
  @IsOptional()
  tax_id?: number;

  @ApiProperty({ example: 1, description: 'Discount ID associated with the product' })
  @IsInt()
  @IsOptional()
  discount_id?: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}