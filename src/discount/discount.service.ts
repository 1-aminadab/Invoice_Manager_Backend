/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiscountDto } from './discount.dto';
import { UpdateDiscountDto } from './discount.dto';

@Injectable()
export class DiscountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDiscountDto: CreateDiscountDto) {
    return await this.prisma.discount.create({
      data: createDiscountDto,
    });
  }

  async findAll() {
    return await this.prisma.discount.findMany();
  }

  async findOne(id: number) {
    const discount = await this.prisma.discount.findUnique({
      where: { discount_id: id },
    });
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return discount;
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    await this.findOne(id); // Ensure the discount exists before updating
    return await this.prisma.discount.update({
      where: { discount_id: id },
      data: updateDiscountDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure the discount exists before deleting
    return await this.prisma.discount.delete({
      where: { discount_id: id },
    });
  }
}
