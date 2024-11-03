import { Module, OnModuleInit } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as redisStore from 'cache-manager-ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { Database } from '../../database';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../Logger/logger.module';
import { ILoggerService } from '../Logger/logger.type';
import { Logger } from '../Logger/GlobalLogger';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoTransformHttpErrors: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      ttl: 600, // Default time-to-live (TTL) for cached items (10 minutes)
      max: 1000, // Maximum number of items in cache
    }),

    UserModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly loggerService: ILoggerService) {}

  public async onModuleInit() {
    await Database.initialize();
    Logger.initialize(this.loggerService);
  }
}
