import { NestFactory, Reflector } from '@nestjs/core';
// import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './modules/app/app.module';
import { CustomClassSerializerInterceptor } from './utils/customSerializeInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ? for graphql file upload
  // app.use('/graphql', graphqlUploadExpress());

  app.useGlobalInterceptors(
    new CustomClassSerializerInterceptor(app.get(Reflector)),
  );

  await app.listen(3999);
}
bootstrap();
