import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceItemsService } from './invoice-items.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';

@ApiTags('invoice-items')
@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

  @Post()
  @ApiBody({ type: CreateInvoiceItemDto })
  @ApiResponse({ status: 201, description: 'The invoice item has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInvoiceItemDto: CreateInvoiceItemDto) {
    const newInvoiceItem = await this.invoiceItemsService.create(createInvoiceItemDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Invoice item successfully created',
      success: true,
      data: newInvoiceItem,
    };
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all invoice items.' })
  async findAll() {
    const invoiceItems = await this.invoiceItemsService.findAll();
    return {
      status: HttpStatus.OK,
      message: 'Invoice items retrieved successfully',
      success: true,
      data: invoiceItems,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return the invoice item with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Invoice item not found.' })
  async findOne(@Param('id') id: string) {
    const invoiceItem = await this.invoiceItemsService.findOne(+id);
    return {
      status: HttpStatus.OK,
      message: 'Invoice item retrieved successfully',
      success: true,
      data: invoiceItem,
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The invoice item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Invoice item not found.' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const deletedInvoiceItem = await this.invoiceItemsService.remove(+id);
    return {
      status: HttpStatus.OK,
      message: 'Invoice item deleted successfully',
      success: true,
      data: deletedInvoiceItem,
    };
  }
}