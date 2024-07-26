import {
  CreateTransactionInput,
  Transaction,
  TransactionStatus,
  UpdateTransactionInput,
} from '../types';

export interface TransactionRepository {
  create(
    data: CreateTransactionInput & { status: TransactionStatus },
  ): Promise<Transaction>;
  update(id: string, data: UpdateTransactionInput): Promise<Transaction>;
  findAll(take: number, skip: number): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
}
