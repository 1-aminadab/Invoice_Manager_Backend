import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, description: 'The invoice has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    const newInvoice = await this.invoicesService.create(createInvoiceDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Invoice successfully created',
      success: true,
      data: newInvoice,
    };
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all invoices.' })
  async findAll() {
    const invoices = await this.invoicesService.findAll();
    return {
      status: HttpStatus.OK,
      message: 'Invoices retrieved successfully',
      success: true,
      data: invoices,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return the invoice with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  async findOne(@Param('id') id: string) {
    const invoice = await this.invoicesService.findOne(+id);
    return {
      status: HttpStatus.OK,
      message: 'Invoice retrieved successfully',
      success: true,
      data: invoice,
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The invoice has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const deletedInvoice = await this.invoicesService.remove(+id);
    return {
      status: HttpStatus.OK,
      message: 'Invoice deleted successfully',
      success: true,
      data: deletedInvoice,
    };
  }
}