import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceTokens } from '../enum/services.enum';
import { appConfig } from '../config/configuration';

@Module({
  providers: [TransactionResolver, TransactionService],
  imports: [
    ClientsModule.register([
      {
        name: ServiceTokens.TRANSACTION_SERVICE,
        transport: Transport.TCP,
        options: {
          port: appConfig.transaction.port,
        },
      },
    ]),
  ],
})
export class TransactionModule {}
