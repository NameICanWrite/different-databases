import { ValidateBookPipePipe } from './validate-book-pipe.pipe';
import { Controller, Get, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Post, Res, UsePipes } from '@nestjs/common/decorators';
import { BooksService } from './books.service';
import { IsEmail, IsNotEmpty } from "class-validator";
import { Response } from 'express';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  cover: string
}

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return await this.booksService.getAllBooks()
  }

  @Get(':id')
  async getBookById(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.getBookById(id)
  }

  @Post()
  @UsePipes(new ValidationPipe()) 
  async createBook(@Body(ValidateBookPipePipe) bookData: CreateBookDto, @Res() res: Response) {
    await this.booksService.createBook(bookData)
    res.send('Book created')
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async editBook(
    @Body(ValidateBookPipePipe) bookData: CreateBookDto, 
    @Res() res: Response, 
    @Param('id', ParseIntPipe) id: number) 
  {
    await this.booksService.editBook(id, bookData)
    res.send('Book edited')
  }

  @Delete(':id')
  async deleteBookById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.booksService.deleteBook(id)
    res.send('Book deleted')
  }

}
