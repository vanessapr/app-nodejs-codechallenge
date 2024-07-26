import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { Transaction, TransactionType } from '../../domain/types';

export const TransactionTypeFactory = new Factory<TransactionType>()
  .attr('id', faker.number.int({ min: 1, max: 10 }))
  .attr('name', faker.finance.transactionType());

export const TransactionFactory = new Factory<Transaction>()
  .attr('transactionExternalId', faker.string.uuid())
  .attr('transactionType', TransactionTypeFactory.build())
  .attr('status', 'approved')
  .attr('value', +faker.finance.amount())
  .attr('createdAt', faker.date.anytime())
  .attr('updatedAt', faker.date.anytime());
