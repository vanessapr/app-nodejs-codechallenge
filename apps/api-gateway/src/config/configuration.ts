import * as path from 'node:path';
import { config as dotenvConfig } from 'dotenv';
import * as Joi from 'joi';

dotenvConfig({ path: path.join(process.cwd(), '.env') });

const envSchema = Joi.object({
  API_GATEWAY_PORT: Joi.number().port().default(3000),
  TRANSACTION_KAFKA_CONSUMER_GROUP_ID: Joi.string().required(),
  TRANSACTION_KAFKA_CLIENT_ID: Joi.string().required().default('ms-antifraud'),
  TRANSACTION_KAFKA_BROKER: Joi.string()
    .required()
    .pattern(/^([\w.-]+:\d{1,5})(,[\w.-]+:\d{1,5})*$/),
});

const { error } = envSchema.validate(process.env, { allowUnknown: true });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const appConfig = {
  port: process.env.API_GATEWAY_PORT,
  transaction: {
    port: +process.env.TRANSACTION_SERVICE_PORT,
    kafka: {
      client: {
        clientId: process.env.TRANSACTION_KAFKA_CLIENT_ID,
        brokers: process.env.TRANSACTION_KAFKA_BROKER.split(','),
      },
      consumer: {
        groupId: process.env.TRANSACTION_KAFKA_CONSUMER_GROUP_ID,
      },
    },
  },
};
