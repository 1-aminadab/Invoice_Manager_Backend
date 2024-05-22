import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { product_id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Ensure the product exists before updating
    return await this.prisma.product.update({
      where: { product_id: id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure the product exists before deleting
    return await this.prisma.product.delete({
      where: { product_id: id },
    });
  }
}
