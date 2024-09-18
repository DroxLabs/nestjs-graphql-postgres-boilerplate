import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const host = process.env.POSTGRES_HOST ?? 'localhost';
const port = parseInt(process.env.POSTGRES_PORT ?? '5432', 10);
const username = process.env.POSTGRES_USER ?? 'root';
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;

if (!password) {
  console.error('Error: POSTGRES_PASSWORD environment variable is not set.');
  process.exit(1);
}

export const Database = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [
    __dirname + '/tables/**.entity.{js,ts}',
    // __dirname + '/cache/**.entity.{js,ts}',
    // __dirname + '/types/**.view.{js,ts}',
  ],
  migrations: [__dirname + '/migrations/*-*.{js,ts}'],
  subscribers: [],
});

export * from './tables';
// export * from './cache';
// export * from './types';
