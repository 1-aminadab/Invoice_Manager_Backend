/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { InvoiceItemsService } from 'src/invoice-items/invoice-items.service';
import { PaymentsService } from 'src/payments/payments.service';

@Module({
  providers: [InvoicesService , InvoiceItemsService, PaymentsService],
  controllers: [InvoicesController]
})
export class InvoicesModule {}
