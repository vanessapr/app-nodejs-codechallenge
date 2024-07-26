import { faker } from '@faker-js/faker';
import { TransactionRepository } from '../../../domain/interfaces/transaction.repository';
import { MockTransactionRepository } from '../../../infraestructure/repositories/mockTransaction.repository';
import { TransactionFactory } from '../../../utils/fixtures';
import { TransactionGetOneById } from '../transactionGetOneById';

describe('TransactionGetOneById', () => {
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new MockTransactionRepository();
  });

  afterEach(() => {
    repository = {} as MockTransactionRepository;
  });

  test('should get transaction by id', async () => {
    const transactionGetOneById = new TransactionGetOneById(repository);
    const transaction = TransactionFactory.build();

    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(transaction));

    const result = await transactionGetOneById.execute(
      transaction.transactionExternalId,
    );
    expect(result).toMatchObject(transaction);
  });

  test('should throw error with transaction doest not exist', async () => {
    const transactionGetOneById = new TransactionGetOneById(repository);
    const transactionId = faker.string.uuid();
    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(() => Promise.resolve(null));

    await expect(transactionGetOneById.execute(transactionId)).rejects.toThrow(
      `Transaction ID: ${transactionId} not found`,
    );
  });
});
