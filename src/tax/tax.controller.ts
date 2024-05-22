/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { TaxService } from './tax.service';
  import { CreateTaxDto } from './dto/create-tax.dto';
  import { UpdateTaxDto } from './dto/update-tax.dto';
  
  @ApiTags('taxes')
  @Controller('taxes')
  export class TaxController {
    constructor(private readonly taxService: TaxService) {}
  
    @Post()
    @ApiBody({ type: CreateTaxDto })
    @ApiResponse({ status: 201, description: 'The tax has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTaxDto: CreateTaxDto) {
      const newTax = await this.taxService.create(createTaxDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Tax successfully created',
        success: true,
        data: newTax,
      };
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Return all taxes.' })
    async findAll() {
      const taxes = await this.taxService.findAll();
      return {
        status: HttpStatus.OK,
        message: 'Taxes retrieved successfully',
        success: true,
        data: taxes,
      };
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Return the tax with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Tax not found.' })
    async findOne(@Param('id') id: string) {
      const tax = await this.taxService.findOne(+id);
      return {
        status: HttpStatus.OK,
        message: 'Tax retrieved successfully',
        success: true,
        data: tax,
      };
    }
  
    @Patch(':id')
    @ApiBody({ type: UpdateTaxDto })
    @ApiResponse({ status: 200, description: 'The tax has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'Tax not found.' })
    async update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
      const updatedTax = await this.taxService.update(+id, updateTaxDto);
      return {
        status: HttpStatus.OK,
        message: 'Tax updated successfully',
        success: true,
        data: updatedTax,
      };
    }
  
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The tax has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Tax not found.' })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
      const deletedTax = await this.taxService.remove(+id);
      return {
        status: HttpStatus.OK,
        message: 'Tax deleted successfully',
        success: true,
        data: deletedTax,
      };
    }
  }
  