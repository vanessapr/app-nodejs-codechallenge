import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { PaginationArgs } from './dto/pagination.args';

@Resolver('Transaction')
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation('createTransaction')
  create(
    @Args('input')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.transactionService.create(createTransactionInput);
  }

  @Query('transactions')
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.transactionService.findAll(paginationArgs);
  }

  @Query('transaction')
  findOne(@Args('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @ResolveField('transactionStatus')
  transactionStatusCustom(@Parent() transaction: any) {
    return { name: transaction.status };
  }
}
