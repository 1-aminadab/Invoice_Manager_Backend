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
  import { ProductsService } from './products.service';
  import { CreateProductDto, UpdateProductDto } from './products.dto';
  
  @ApiTags('products')
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto) {
      const newProduct = await this.productsService.create(createProductDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Product successfully created',
        success: true,
        data: newProduct,
      };
    }
  
    @Get()
    @ApiResponse({ status: 200, description: 'Return all products.' })
    async findAll() {
      const products = await this.productsService.findAll();
      return {
        status: HttpStatus.OK,
        message: 'Products retrieved successfully',
        success: true,
        data: products,
      };
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Return the product with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async findOne(@Param('id') id: string) {
      const product = await this.productsService.findOne(+id);
      return {
        status: HttpStatus.OK,
        message: 'Product retrieved successfully',
        success: true,
        data: product,
      };
    }
  
    @Patch(':id')
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
      const updatedProduct = await this.productsService.update(+id, updateProductDto);
      return {
        status: HttpStatus.OK,
        message: 'Product updated successfully',
        success: true,
        data: updatedProduct,
      };
    }
  
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
      const deletedProduct = await this.productsService.remove(+id);
      return {
        status: HttpStatus.OK,
        message: 'Product deleted successfully',
        success: true,
        data: deletedProduct,
      };
    }
  }
  