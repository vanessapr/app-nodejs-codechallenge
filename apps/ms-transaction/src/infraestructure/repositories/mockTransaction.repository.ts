import { faker } from '@faker-js/faker';
import { TransactionRepository } from '../../domain/interfaces/transaction.repository';
import {
  CreateTransactionInput,
  Transaction,
  TransactionStatus,
  TransactionType,
  UpdateTransactionInput,
} from '../../domain/types';

export class MockTransactionRepository implements TransactionRepository {
  private data: Transaction[] = [];

  create(
    data: CreateTransactionInput & { status: TransactionStatus },
  ): Promise<Transaction> {
    const mockTransaction: Transaction = {
      transactionExternalId: faker.string.uuid(),
      transactionType: {
        id: data.tranferTypeId,
        name: 'Transfer',
      } as TransactionType,
      status: 'pending',
      value: data.value,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return Promise.resolve(mockTransaction);
  }

  update(id: string, data: UpdateTransactionInput): Promise<Transaction> {
    const itemFound = this.data.find(
      (item) => item.transactionExternalId === id,
    );
    const itemUpdated = { ...itemFound, ...data };
    return Promise.resolve(itemUpdated);
  }

  findAll(take: number, skip: number): Promise<Transaction[]> {
    return Promise.resolve(this.data.splice(skip, take));
  }

  findById(id: string): Promise<Transaction | null> {
    const itemFound = this.data.find(
      (item) => item.transactionExternalId === id,
    );
    return Promise.resolve(itemFound);
  }
}
