import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['*', 'http://localhost:3000'],
  })
  await app.listen(process.env.PORT);
}
bootstrap();
