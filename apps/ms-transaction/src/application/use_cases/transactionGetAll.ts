import { TransactionRepository } from '../../domain/interfaces/transaction.repository';

export class TransactionGetAll {
  constructor(private readonly repository: TransactionRepository) {}

  execute(limit = 50, offset = 0) {
    return this.repository.findAll(limit, offset);
  }
}
