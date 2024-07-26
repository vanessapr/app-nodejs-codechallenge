import { Module } from '@nestjs/common';
import { TransactionModule } from './infraestructure/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
