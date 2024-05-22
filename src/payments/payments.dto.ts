class CreatePaymentDto {
    @ApiProperty({ example: '2023-05-22' })
    @IsDate()
    @IsNotEmpty()
    payment_date: Date;
  
    @ApiProperty({ example: 100.00 })
    @IsDecimal()
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
  