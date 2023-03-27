import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }));
  await app.listen(3000);
}
bootstrap();
