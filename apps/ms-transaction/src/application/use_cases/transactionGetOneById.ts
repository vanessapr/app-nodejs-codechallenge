import { NotFoundException } from '../../domain/errors';
import { TransactionRepository } from '../../domain/interfaces/transaction.repository';

export class TransactionGetOneById {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(id: string) {
    const transaction = await this.repository.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction ID: ${id} not found`);
    }
    return transaction;
  }
}
