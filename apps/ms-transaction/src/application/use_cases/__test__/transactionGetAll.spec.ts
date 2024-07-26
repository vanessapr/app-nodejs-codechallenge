import { faker } from '@faker-js/faker';
import { TransactionRepository } from '../../../domain/interfaces/transaction.repository';
import { MockTransactionRepository } from '../../../infraestructure/repositories/mockTransaction.repository';
import { TransactionGetAll } from '../transactionGetAll';
import { TransactionFactory } from '../../../utils/fixtures';

describe('TransactionGetAll', () => {
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new MockTransactionRepository();
  });

  afterEach(() => {
    repository = {} as MockTransactionRepository;
  });

  test('should get transactions by offset and limit', async () => {
    const transactionGetAll = new TransactionGetAll(repository);
    const randomLimit = faker.number.int({ min: 1, max: 50 });
    const transactions = TransactionFactory.buildList(randomLimit);

    jest
      .spyOn(repository, 'findAll')
      .mockImplementationOnce(() => Promise.resolve(transactions));

    const result = await transactionGetAll.execute(randomLimit, 0);
    expect(result.length).toEqual(randomLimit);
    expect(result).toMatchObject(transactions);
  });
});
