import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

let httpsOptions = null;

try {
  httpsOptions = {
    key: fs.readFileSync(process.env.SSLKEY || ''),
    cert: fs.readFileSync(process.env.SSLCERT || ''),
  };
} catch {
  console.log("can't find key and cert");
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(process.env.HOST_PORT);
}
bootstrap();
