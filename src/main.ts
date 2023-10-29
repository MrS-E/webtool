import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DATABASE_URL);
  await app.listen(3000);
}
bootstrap();
