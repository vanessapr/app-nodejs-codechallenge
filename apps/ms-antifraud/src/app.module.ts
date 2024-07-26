import { Module } from '@nestjs/common';
import { AntifraudModule } from './infraestructure/antifraud.module';

@Module({
  imports: [AntifraudModule],
})
export class AppModule {}
