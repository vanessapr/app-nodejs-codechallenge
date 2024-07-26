import { CreateTransactionInput } from '../../domain/types';
import { TransactionRepository } from '../../domain/interfaces/transaction.repository';
import { DatabaseException } from '../../domain/errors';

export class TransactionCreate {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(input: CreateTransactionInput) {
    try {
      const transaction = await this.repository.create({
        ...input,
        status: 'pending',
      });
      return transaction;
    } catch (err) {
      throw new DatabaseException('Unable to create the transaction');
    }
  }
}
