import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { ServiceTokens } from '../enum/services.enum';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationArgs } from './dto/pagination.args';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(ServiceTokens.TRANSACTION_SERVICE)
    private readonly transactionService: ClientProxy,
  ) {}

  create(createTransactionInput: CreateTransactionInput) {
    return this.transactionService.send(
      'transaction.create',
      createTransactionInput,
    );
  }

  findAll(paginationArgs: PaginationArgs) {
    return this.transactionService.send('transaction.get_all', paginationArgs);
  }

  findOne(id: string) {
    return this.transactionService.send('transaction.get_by_id', { id });
  }
}
