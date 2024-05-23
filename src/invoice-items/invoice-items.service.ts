/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoiceItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceItemDto: any) {
    return this.prisma.invoiceItem.create({
      data: createInvoiceItemDto,
    });
  }

  async findAll() {
    return this.prisma.invoiceItem.findMany();
  }

  async findOne(id: number) {
    return this.prisma.invoiceItem.findUnique({
      where: { invoice_item_id: id },
    });
  }

  async remove(id: number) {
    return this.prisma.invoiceItem.delete({
      where: { invoice_item_id: id },
    });
  }
}
