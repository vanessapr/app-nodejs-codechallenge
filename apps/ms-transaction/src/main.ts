import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { appConfig } from './infraestructure/config/configuration';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: appConfig.port,
      },
    },
  );
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    { transport: Transport.KAFKA, options: appConfig.kafka },
  );

  kafkaApp.listen();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen();
}
bootstrap();
