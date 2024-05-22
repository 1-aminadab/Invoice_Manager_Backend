import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaxDto {
  @ApiProperty({ example: 'VAT', description: 'Name of the tax' })
  @IsString()
  @IsNotEmpty()
  tax_name: string;

  @ApiProperty({ example: 0.18, description: 'Rate of the tax' })
  @IsDecimal()
  @IsNotEmpty()
  tax_rate: number;

}
export class UpdateTaxDto extends PartialType(CreateTaxDto) {}
