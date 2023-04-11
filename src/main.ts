import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8888',
    credentials: true,
  });
  await app.listen(process.env.HOST_PORT);
}
bootstrap();
