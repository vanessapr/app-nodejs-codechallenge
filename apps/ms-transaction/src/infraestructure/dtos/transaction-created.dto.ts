import { Transaction } from '../../domain/types';

export class TransactionCreatedDto {
  constructor(public readonly transaction: Transaction) {}

  toString() {
    return JSON.stringify({
      id: this.transaction.transactionExternalId,
      value: this.transaction.value,
    });
  }
}
