import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { corsOptions } from './constants/cors';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: corsOptions,
  });

  const port = 3000;
  await app.listen(port, () => console.log(`[Server started on port ${port}]`));
})();
