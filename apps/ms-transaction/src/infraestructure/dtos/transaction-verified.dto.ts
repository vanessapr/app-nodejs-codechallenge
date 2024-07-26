import { TransactionStatus } from '../../domain/types';

export class TransactionVerifiedDto {
  id: string;
  status: TransactionStatus;
}
