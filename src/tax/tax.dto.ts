/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaxDto {
  @ApiProperty({ example: 1, description: 'Name of the tax' })
  @IsNotEmpty()
  tax_added_by: number;

  @ApiProperty({ example: 'VAT', description: 'Name of the tax' })
  @IsString()
  @IsNotEmpty()
  tax_name: string;

  @ApiProperty({ example: 0.18, description: 'Rate of the tax' })
  @IsNotEmpty()
  tax_rate: number;

}
export class UpdateTaxDto extends PartialType(CreateTaxDto) {}
