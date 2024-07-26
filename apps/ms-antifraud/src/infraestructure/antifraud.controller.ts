import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { IncomingTransactionDto } from './dtos/incoming-transaction.dto';
import { VerifyTransaction } from '../application/verifyTransaction';
import { TransactionVerifiedDto } from './dtos/transaction-verified.dto';

@Controller()
export class AntifraudController {
  constructor(
    @Inject('VerifyTransaction')
    private readonly verifyTransaction: VerifyTransaction,
    @Inject('TRANSACTION_SERVICE') private readonly client: ClientKafka,
  ) {}

  @EventPattern('transaction.created')
  verify(@Payload() incomingTransactionDto: IncomingTransactionDto) {
    const status = this.verifyTransaction.execute(incomingTransactionDto);
    this.client.emit(
      `transaction.${status}`,
      new TransactionVerifiedDto(incomingTransactionDto.id, status),
    );
  }
}
