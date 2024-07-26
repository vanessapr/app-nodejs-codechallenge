import { TransactionStatus } from '../../domain/types';

export class TransactionVerifiedDto {
  constructor(
    public readonly id: string,
    public readonly status: TransactionStatus,
  ) {}

  toString() {
    return JSON.stringify({
      id: this.id,
      status: this.status,
    });
  }
}
