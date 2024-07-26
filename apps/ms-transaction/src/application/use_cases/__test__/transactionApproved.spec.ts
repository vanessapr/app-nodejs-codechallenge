import { faker } from '@faker-js/faker';
import { TransactionRepository } from '../../../domain/interfaces/transaction.repository';
import { MockTransactionRepository } from '../../../infraestructure/repositories/mockTransaction.repository';
import { TransactionApproved } from '../transactionApproved';
import { TransactionFactory } from '../../../utils/fixtures';

describe('TransactionApproved', () => {
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new MockTransactionRepository();
  });

  afterEach(() => {
    repository = {} as MockTransactionRepository;
  });

  test('should update the status to approved', async () => {
    const transactionApproved = new TransactionApproved(repository);
    const transaction = TransactionFactory.build();
    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(transaction));
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(() =>
        Promise.resolve({ ...transaction, status: 'approved' }),
      );
    const result = await transactionApproved.execute(
      transaction.transactionExternalId,
    );
    expect(result.status).toEqual('approved');
  });

  test('should throw error when the transaction not found', async () => {
    const transactionApproved = new TransactionApproved(repository);
    const transactionId = faker.string.uuid();
    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(null));

    await expect(transactionApproved.execute(transactionId)).rejects.toThrow(
      `Transaction ID: ${transactionId} not found`,
    );
  });

  test('should throw error with unable to update transaction', async () => {
    const transactionApproved = new TransactionApproved(repository);
    const transaction = TransactionFactory.build();
    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(transaction));

    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(
      transactionApproved.execute(transaction.transactionExternalId),
    ).rejects.toThrow('Unable to update the transaction');
  });
});
