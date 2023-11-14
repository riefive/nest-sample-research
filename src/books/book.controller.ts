import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { BookService, Book } from './book.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('book')
@Public()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBook(@Query('id', ParseIntPipe) id: number): Book {
    return this.bookService.findById(id);
  }

  @Get('all')
  getBookAll(): Book[] {
    return this.bookService.findAll();
  }
}
