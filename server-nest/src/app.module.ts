import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';
import dotenv from 'dotenv'

dotenv.config()


let type
switch (process.env.DB_Dialect) {
  case "mysql": type = "mysql"; break;
  case "postgres": type = "postgres"; break;
  default: type = "postgres";
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Book],
      synchronize: true,
      extra: {
        ssl: true
      }
    }), 
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
