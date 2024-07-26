import { TransactionCreatedInput, TransactionStatus } from '../domain/types';

export class VerifyTransaction {
  execute(transaction: TransactionCreatedInput) {
    if (transaction.value > 0 && transaction.value <= 1000) {
      return TransactionStatus.APPROVED;
    }
    return TransactionStatus.REJECTED;
  }
}
