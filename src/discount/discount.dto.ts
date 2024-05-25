/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({ example: 'Seasonal', description: 'Type of the discount' })
  @IsString()
  @IsNotEmpty()
  discount_type: string;

  @ApiProperty({ example: 0.15, description: 'Value of the discount' })
  @IsNotEmpty()
  discount_value: number;

}
export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {}