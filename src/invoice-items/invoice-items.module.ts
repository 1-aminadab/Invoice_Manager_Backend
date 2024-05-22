import { Module } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { InvoiceItemsController } from './invoice-items.controller';

@Module({
  providers: [InvoiceItemsService],
  controllers: [InvoiceItemsController]
})
export class InvoiceItemsModule {}
