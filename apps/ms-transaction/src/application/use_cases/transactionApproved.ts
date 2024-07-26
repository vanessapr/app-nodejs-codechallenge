import { NotFoundException } from '../../domain/errors';
import { TransactionRepository } from '../../domain/interfaces/transaction.repository';
import { DatabaseException } from '../../domain/errors';

export class TransactionApproved {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(id: string) {
    const transaction = await this.repository.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction ID: ${id} not found`);
    }
    try {
      return await this.repository.update(id, { status: 'approved' });
    } catch (err) {
      throw new DatabaseException('Unable to update the transaction');
    }
  }
}
