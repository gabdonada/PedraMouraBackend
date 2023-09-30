import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe); //makes body validation
  app.enableCors(); //enables URLs access - by using it, we allow access to all routes

  await app.listen(3000);
}
bootstrap();
