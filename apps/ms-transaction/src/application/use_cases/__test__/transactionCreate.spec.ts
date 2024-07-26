import { faker } from '@faker-js/faker';
import { TransactionRepository } from '../../../domain/interfaces/transaction.repository';
import { MockTransactionRepository } from '../../../infraestructure/repositories/mockTransaction.repository';
import { TransactionCreate } from '../transactionCreate';

const mockRequest = (req?: any) => {
  return {
    accountExternalIdDebit: faker.finance.accountNumber(10),
    accountExternalIdCredit: faker.finance.accountNumber(10),
    tranferTypeId: faker.number.int({ min: 10, max: 10 }),
    ...req,
  };
};

describe('TransactionCreate', () => {
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new MockTransactionRepository();
  });

  afterEach(() => {
    repository = {} as MockTransactionRepository;
  });

  test('should create transaction', async () => {
    const transactionCreate = new TransactionCreate(repository);
    const reqBody = mockRequest({ value: +faker.finance.amount() });
    const result = await transactionCreate.execute(reqBody);
    expect(result).toMatchObject({
      transactionExternalId: expect.any(String),
      transactionType: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      }),
      status: expect.any(String),
      value: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('should throw error with unable to create transaction', async () => {
    const transactionCreate = new TransactionCreate(repository);
    const reqBody = mockRequest();

    jest
      .spyOn(repository, 'create')
      .mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(transactionCreate.execute(reqBody)).rejects.toThrow(
      'Unable to create the transaction',
    );
  });
});
