import { faker } from '@faker-js/faker';
import { TransactionRepository } from '../../../domain/interfaces/transaction.repository';
import { MockTransactionRepository } from '../../../infraestructure/repositories/mockTransaction.repository';
import { TransactionFactory } from '../../../utils/fixtures';
import { TransactionRejected } from '../transactionRejected';

describe('TransactionRejected', () => {
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new MockTransactionRepository();
  });

  afterEach(() => {
    repository = {} as MockTransactionRepository;
  });

  test('should update the status to rejected', async () => {
    const transactionRejected = new TransactionRejected(repository);
    const transaction = TransactionFactory.build();
    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(transaction));
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(() =>
        Promise.resolve({ ...transaction, status: 'rejected' }),
      );
    const result = await transactionRejected.execute(
      transaction.transactionExternalId,
    );
    expect(result.status).toEqual('rejected');
  });

  test('should throw error when the transaction not found', async () => {
    const transactionRejected = new TransactionRejected(repository);
    const transactionId = faker.string.uuid();
    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(null));

    await expect(transactionRejected.execute(transactionId)).rejects.toThrow(
      `Transaction ID: ${transactionId} not found`,
    );
  });

  test('should throw error with unable to update transaction', async () => {
    const transactionRejected = new TransactionRejected(repository);
    const transaction = TransactionFactory.build();
    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(transaction));

    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(
      transactionRejected.execute(transaction.transactionExternalId),
    ).rejects.toThrow('Unable to update the transaction');
  });
});
