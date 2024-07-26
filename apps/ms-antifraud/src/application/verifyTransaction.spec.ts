import { faker } from '@faker-js/faker';
import { VerifyTransaction } from './verifyTransaction';

describe('VerifyTransaction', () => {
  test('Approve the transaction when the amount is less than or equal 1000', () => {
    const mockRequest = {
      id: faker.string.uuid(),
      value: 250,
    };
    const verifyTransaction = new VerifyTransaction();
    const result = verifyTransaction.execute(mockRequest);
    expect(result).toEqual('approved');
  });

  test('Reject the transaction when the amount is greater than 1000', () => {
    const mockRequest = {
      id: faker.string.uuid(),
      value: 5000,
    };
    const verifyTransaction = new VerifyTransaction();
    const result = verifyTransaction.execute(mockRequest);
    expect(result).toEqual('rejected');
  });
});
