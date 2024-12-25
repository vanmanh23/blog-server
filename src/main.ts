import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const uploadsDir = join(__dirname, '..', 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir);
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
