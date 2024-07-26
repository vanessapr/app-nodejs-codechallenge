import { Module } from '@nestjs/common';
import { AntifraudController } from './antifraud.controller';
import { VerifyTransaction } from '../application/verifyTransaction';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { appConfig } from './config/configuration';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTION_SERVICE',
        transport: Transport.KAFKA,
        options: appConfig.transaction.kafka,
      },
    ]),
  ],
  controllers: [AntifraudController],
  providers: [
    {
      provide: 'VerifyTransaction',
      useClass: VerifyTransaction,
    },
  ],
})
export class AntifraudModule {}
