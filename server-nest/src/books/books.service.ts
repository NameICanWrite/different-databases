import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

type setBookType = {
  title: string,
  description: string,
  cover: string
}

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>
  ) {}

  getAllBooks() {
    return this.booksRepository.find()
  }

  getBookById(id: number) {
    return this.booksRepository.findOneBy({id})
  }

  createBook(book: setBookType) {
    return this.booksRepository.save(book)
  }

  editBook(id: number, newBook: setBookType) {
    return this.booksRepository.update(id, newBook)
  }

  deleteBook(id: number) {
    return this.booksRepository.delete(id)
  }
}


