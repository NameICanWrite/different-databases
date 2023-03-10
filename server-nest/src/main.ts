import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS", "PATCH", "PUT", 'DELETE'],
    credentials: true
  })
  await app.listen(5000);

}
bootstrap();
