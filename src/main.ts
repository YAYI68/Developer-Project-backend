import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.setGlobalPrefix('/api/v1');
  app.use(
    session({
      secret: process.env.jwtsecret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
