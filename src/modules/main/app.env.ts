import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  CATS_URL: process.env.CATS_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_SSL: process.env.DB_SSL === 'true',
  DB_SSL_IGNORE_SERVER_IDENTITY: process.env.DB_SSL_IGNORE_SERVER_IDENTITY,
  DB_POOL_MIN: parseInt(process.env.DB_POOL_MIN || '2', 10),
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX || '5', 10),
  LOG_CONSOLE_LEVEL: process.env.LOG_CONSOLE_LEVEL,
  LOG_FILE_ACTIVE: process.env.LOG_FILE_ACTIVE,
  LOG_FILE_LEVEL: process.env.LOG_FILE_LEVEL,
  LOG_FILE_NAME: process.env.LOG_FILE_NAME,
  PORT: parseInt(process.env.PORT || '3000', 10),
};

export default Object.freeze(env);
