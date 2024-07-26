import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionController } from './transaction.controller';
import { TransactionPrismaRepository } from './repositories/transactionPrisma.repository';
import { TransactionGetAll } from '../application/use_cases/transactionGetAll';
import { TransactionGetOneById } from '../application/use_cases/transactionGetOneById';
import { TransactionCreate } from '../application/use_cases/transactionCreate';
import { TransactionApproved } from '../application/use_cases/transactionApproved';
import { TransactionRejected } from '../application/use_cases/transactionRejected';
import { PrismaService } from './repositories/prisma.service';
import { appConfig } from './config/configuration';

@Module({
  controllers: [TransactionController],
  imports: [
    ClientsModule.register([
      {
        name: 'ANTIFRAUD_SERVICE',
        transport: Transport.KAFKA,
        options: appConfig.antifraud.kafka,
      },
    ]),
  ],
  providers: [
    PrismaService,
    { provide: 'TransactionRepository', useClass: TransactionPrismaRepository },
    {
      provide: 'TransactionGetAll',
      useFactory: (repository: TransactionPrismaRepository) =>
        new TransactionGetAll(repository),
      inject: ['TransactionRepository'],
    },
    {
      provide: 'TransactionGetOneById',
      useFactory: (repository: TransactionPrismaRepository) =>
        new TransactionGetOneById(repository),
      inject: ['TransactionRepository'],
    },
    {
      provide: 'TransactionCreate',
      useFactory: (repository: TransactionPrismaRepository) =>
        new TransactionCreate(repository),
      inject: ['TransactionRepository'],
    },
    {
      provide: 'TransactionApproved',
      useFactory: (repository: TransactionPrismaRepository) =>
        new TransactionApproved(repository),
      inject: ['TransactionRepository'],
    },
    {
      provide: 'TransactionRejected',
      useFactory: (repository: TransactionPrismaRepository) =>
        new TransactionRejected(repository),
      inject: ['TransactionRepository'],
    },
  ],
})
export class TransactionModule {}
