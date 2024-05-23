/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvoiceItemsService } from 'src/invoice-items/invoice-items.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly invoiceItemsService: InvoiceItemsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async create(createInvoiceDto:any  ) {
    const { invoice_items, payment, ...invoiceData } = createInvoiceDto;

    const newInvoice = await this.prisma.invoice.create({
      data: invoiceData,
    });

    await Promise.all(invoice_items.map(item => 
      this.invoiceItemsService.create({
        ...item,
        invoice_id: newInvoice.invoice_id,
      })
    ));

    await this.paymentsService.create({
      ...payment,
      invoice_id: newInvoice.invoice_id,
    });

    return newInvoice;
  }

  async findAll() {
    return this.prisma.invoice.findMany({
      include: {
        payments: true,
      },
    });
  }

  async findOne(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { invoice_id: id },
      include: {
        payments: true,
      },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.invoice.delete({
      where: { invoice_id: id },
    });
  }
}
