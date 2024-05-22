import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Injectable()
export class TaxService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaxDto: CreateTaxDto) {
    return await this.prisma.tax.create({
      data: createTaxDto,
    });
  }

  async findAll() {
    return await this.prisma.tax.findMany();
  }

  async findOne(id: number) {
    const tax = await this.prisma.tax.findUnique({
      where: { tax_id: id },
    });
    if (!tax) {
      throw new NotFoundException(`Tax with ID ${id} not found`);
    }
    return tax;
  }

  async update(id: number, updateTaxDto: UpdateTaxDto) {
    await this.findOne(id); // Ensure the tax exists before updating
    return await this.prisma.tax.update({
      where: { tax_id: id },
      data: updateTaxDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure the tax exists before deleting
    return await this.prisma.tax.delete({
      where: { tax_id: id },
    });
  }
}