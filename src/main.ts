import { NestFactory, Reflector } from '@nestjs/core';
// import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './modules/app/app.module';
import { CustomClassSerializerInterceptor } from './utils/customSerializeInterceptor';
import { GlobalExceptionsFilter } from './common/global-exception.filters';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ? for graphql file upload
  // app.use('/graphql', graphqlUploadExpress());

  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalInterceptors(
    new CustomClassSerializerInterceptor(app.get(Reflector)),
  );

  const logger = new Logger();

  await app.listen(3999);
  logger.log('Application is running on: http://localhost:3999');
}
bootstrap();
