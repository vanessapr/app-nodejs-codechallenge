export type TransactionStatus = 'pending' | 'approved' | 'rejected';

export type TransactionType = {
  id: number;
  name: string;
};

export type Transaction = {
  transactionExternalId: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  value: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTransactionInput = {
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  tranferTypeId: number;
  value: number;
};

export type UpdateTransactionInput = Partial<CreateTransactionInput> & {
  status?: TransactionStatus;
};
