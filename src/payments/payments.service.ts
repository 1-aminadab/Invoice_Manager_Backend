/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: any) {
    return this.prisma.payment.create({
      data: createPaymentDto,
    });
  }

  async findAll() {
    return this.prisma.payment.findMany();
  }

  async findOne(id: number) {
    return this.prisma.payment.findUnique({
      where: { payment_id: id },
    });
  }

  async remove(id: number) {
    return this.prisma.payment.delete({
      where: { payment_id: id },
    });
  }
}
