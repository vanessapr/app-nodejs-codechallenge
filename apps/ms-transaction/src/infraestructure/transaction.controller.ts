import { Controller, Inject, Logger } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { TransactionGetAll } from './../application/use_cases/transactionGetAll';
import { TransactionGetOneById } from '../application/use_cases/transactionGetOneById';
import { TransactionCreate } from '../application/use_cases/transactionCreate';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { TransactionVerifiedDto } from './dtos/transaction-verified.dto';
import { TransactionApproved } from '../application/use_cases/transactionApproved';
import { TransactionRejected } from '../application/use_cases/transactionRejected';
import { TransactionCreatedDto } from './dtos/transaction-created.dto';

@Controller()
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(
    @Inject('ANTIFRAUD_SERVICE') private readonly antifraudService: ClientKafka,
    @Inject('TransactionGetAll')
    private readonly transactionGetAll: TransactionGetAll,
    @Inject('TransactionGetOneById')
    private readonly transactionGetOneBydId: TransactionGetOneById,
    @Inject('TransactionCreate')
    private readonly transactionCreate: TransactionCreate,
    @Inject('TransactionApproved')
    private readonly transactionApproved: TransactionApproved,
    @Inject('TransactionRejected')
    private readonly transactionRejected: TransactionRejected,
  ) {}

  @MessagePattern('transaction.create')
  async createTransaction(
    @Payload() createTransactionDto: CreateTransactionDto,
  ) {
    try {
      const transaction =
        await this.transactionCreate.execute(createTransactionDto);
      this.antifraudService.emit(
        'transaction.created',
        new TransactionCreatedDto(transaction),
      );
      return {
        success: true,
        message: 'Transaction created successfully',
        transaction,
      };
    } catch (err) {
      this.logger.error(err.message, err);
      return {
        success: false,
        message: 'An error ocurred while creating the transaction',
      };
    }
  }

  @MessagePattern('transaction.get_all')
  getAllTransactions(@Payload() paginationDto: PaginationDto) {
    return this.transactionGetAll.execute(
      paginationDto.first,
      paginationDto.offset,
    );
  }

  @MessagePattern('transaction.get_by_id')
  async getTransactionById(@Payload('id') id: string) {
    try {
      return await this.transactionGetOneBydId.execute(id);
    } catch (err) {
      this.logger.error(err.message, err);
      return null;
    }
  }

  @EventPattern('transaction.approved', Transport.KAFKA)
  async approvedTransactionReceived(
    @Payload() transactionVerifiedDto: TransactionVerifiedDto,
  ) {
    try {
      this.transactionApproved.execute(transactionVerifiedDto.id);
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  @EventPattern('transaction.rejected', Transport.KAFKA)
  async rejectedTransactionReceived(
    @Payload() transactionVerifiedDto: TransactionVerifiedDto,
  ) {
    try {
      await this.transactionRejected.execute(transactionVerifiedDto.id);
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
