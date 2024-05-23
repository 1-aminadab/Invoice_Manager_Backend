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
  import { DiscountService } from './discount.service';
  import { CreateDiscountDto } from './discount.dto';
  import { UpdateDiscountDto } from './discount.dto';
  
  @ApiTags('discounts')
  @Controller('discounts')
  export class DiscountController {
    constructor(private readonly discountService: DiscountService) {}
  
    @Post()
    @ApiBody({ type: CreateDiscountDto })
    @ApiResponse({ status: 201, description: 'The discount has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createDiscountDto: CreateDiscountDto) {
      const newDiscount = await this.discountService.create(createDiscountDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Discount successfully created',
        success: true,
        data: newDiscount,
      };
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Return all discounts.' })
    async findAll() {
      const discounts = await this.discountService.findAll();
      return {
        status: HttpStatus.OK,
        message: 'Discounts retrieved successfully',
        success: true,
        data: discounts,
      };
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Return the discount with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Discount not found.' })
    async findOne(@Param('id') id: string) {
      const discount = await this.discountService.findOne(+id);
      return {
        status: HttpStatus.OK,
        message: 'Discount retrieved successfully',
        success: true,
        data: discount,
      };
    }
  
    @Patch(':id')
    @ApiBody({ type: UpdateDiscountDto })
    @ApiResponse({ status: 200, description: 'The discount has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'Discount not found.' })
    async update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
      const updatedDiscount = await this.discountService.update(+id, updateDiscountDto);
      return {
        status: HttpStatus.OK,
        message: 'Discount updated successfully',
        success: true,
        data: updatedDiscount,
      };
    }
  
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The discount has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Discount not found.' })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
      const deletedDiscount = await this.discountService.remove(+id);
      return {
        status: HttpStatus.OK,
        message: 'Discount deleted successfully',
        success: true,
        data: deletedDiscount,
      };
    }
  }
  