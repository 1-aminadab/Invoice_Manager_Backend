import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';

@Injectable()
export class InvoiceItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceItemDto: CreateInvoiceItemDto) {
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
