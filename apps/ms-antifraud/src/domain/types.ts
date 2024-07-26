export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type TransactionCreatedInput = {
  id: string;
  value: number;
  status?: TransactionStatus;
};
