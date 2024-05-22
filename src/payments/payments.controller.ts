import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, description: 'The payment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const newPayment = await this.paymentsService.create(createPaymentDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Payment successfully created',
      success: true,
      data: newPayment,
    };
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all payments.' })
  async findAll() {
    const payments = await this.paymentsService.findAll();
    return {
      status: HttpStatus.OK,
      message: 'Payments retrieved successfully',
      success: true,
      data: payments,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return the payment with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async findOne(@Param('id') id: string) {
    const payment = await this.paymentsService.findOne(+id);
    return {
      status: HttpStatus.OK,
      message: 'Payment retrieved successfully',
      success: true,
      data: payment,
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The payment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const deletedPayment = await this.paymentsService.remove(+id);
    return {
      status: HttpStatus.OK,
      message: 'Payment deleted successfully',
      success: true,
      data: deletedPayment,
    };
  }
}