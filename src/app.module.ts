/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TaxModule } from './tax/tax.module';
import { DiscountModule } from './discount/discount.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { InvoiceItemsModule } from './invoice-items/invoice-items.module';


@Module({
  imports: [ UsersModule, AuthModule, PrismaModule, ProductsModule, TaxModule, DiscountModule, InvoicesModule, PaymentsModule, InvoiceItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
