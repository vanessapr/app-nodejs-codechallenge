import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/interfaces/transaction.repository';
import {
  CreateTransactionInput,
  TransactionStatus,
  Transaction,
  UpdateTransactionInput,
} from '../../domain/types';
import { PrismaService } from './prisma.service';

@Injectable()
export class TransactionPrismaRepository implements TransactionRepository {
  constructor(private readonly client: PrismaService) {}

  create({
    tranferTypeId,
    ...rest
  }: CreateTransactionInput & {
    status: TransactionStatus;
  }): Promise<Transaction> {
    return this.client.transaction.create({
      data: { ...rest, transactionType: { connect: { id: tranferTypeId } } },
      include: { transactionType: true },
    });
  }
  update(id: string, data: UpdateTransactionInput): Promise<Transaction> {
    return this.client.transaction.update({
      where: { transactionExternalId: id },
      data,
      include: { transactionType: true },
    });
  }
  findAll(take: number, skip: number): Promise<Transaction[]> {
    return this.client.transaction.findMany({
      take,
      skip,
      include: { transactionType: true },
      orderBy: [{ createdAt: 'desc' }, { tranferTypeId: 'asc' }],
    });
  }
  findById(id: string): Promise<Transaction | null> {
    return this.client.transaction.findUnique({
      where: { transactionExternalId: id },
      include: { transactionType: true },
    });
  }
}
