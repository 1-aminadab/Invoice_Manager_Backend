/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit{
    constructor() {
        super({
            datasources: {
                db: {
                    url:"postgresql://invoice_postgres_owner:s2R4JcZoAeVi@ep-soft-truth-a51x9l4c.us-east-2.aws.neon.tech/invoice_postgres?sslmode=require"
                }
            }
        })
    }

    async onModuleInit() {
        await  this.$connect()
    }
    async onModuleDestroy() {
        await this.$disconnect()
    }
}