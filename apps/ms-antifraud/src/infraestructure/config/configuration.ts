import * as path from 'node:path';
import { config as dotenvConfig } from 'dotenv';
import * as Joi from 'joi';

dotenvConfig({ path: path.join(process.cwd(), '.env') });

const envSchema = Joi.object({
  ANTIFRAUD_KAFKA_CLIENT_ID: Joi.string().required().default('ms-antifraud'),
  ANTIFRAUD_KAFKA_CONSUMER_GROUP_ID: Joi.string().required(),
  ANTIFRAUD_KAFKA_BROKER: Joi.string()
    .required()
    .pattern(/^([\w.-]+:\d{1,5})(,[\w.-]+:\d{1,5})*$/),
  TRANSACTION_KAFKA_CLIENT_ID: Joi.string()
    .required()
    .default('ms-transaction'),
  TRANSACTION_KAFKA_BROKER: Joi.string()
    .required()
    .pattern(/^([\w.-]+:\d{1,5})(,[\w.-]+:\d{1,5})*$/),
});

const { error } = envSchema.validate(process.env, { allowUnknown: true });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const appConfig = {
  kafka: {
    client: {
      clientId: process.env.ANTIFRAUD_KAFKA_CLIENT_ID,
      brokers: process.env.ANTIFRAUD_KAFKA_BROKER.split(','),
    },
    consumer: {
      groupId: process.env.ANTIFRAUD_KAFKA_CONSUMER_GROUP_ID,
    },
  },
  transaction: {
    kafka: {
      client: {
        clientId: process.env.TRANSACTION_KAFKA_CLIENT_ID,
        brokers: process.env.TRANSACTION_KAFKA_BROKER.split(','),
      },
    },
  },
};
