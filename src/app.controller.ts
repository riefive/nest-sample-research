import { LazyModuleLoader } from '@nestjs/core';
import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

const isLazy = true

@Controller()
@Public()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private lazyModuleLoader: LazyModuleLoader
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('book-lazy')
  async getBook(@Query('id', ParseIntPipe) id: number) {
    if (!isLazy) return {}
    const { BookModule } = await import('./books/book.module');
    const { BookService } = await import('./books/book.service');
    const moduleRef = await this.lazyModuleLoader.load(() => BookModule);
    const bookService = moduleRef.get(BookService);
    return bookService.findById(id);
  }

  @Get('book-lazy-all')
  async getBookAll() {
    if (!isLazy) return {}
    const { BookModule } = await import('./books/book.module');
    const { BookService } = await import('./books/book.service');
    const moduleRef = await this.lazyModuleLoader.load(() => BookModule);
    const bookService = moduleRef.get(BookService);
    return bookService.findAll();
  }

  @Get('movie-lazy')
  async getMovie(@Query('id', ParseIntPipe) id: number) {
    if (!isLazy) return {}
    const { MovieModule } = await import('./movies/movie.module');
    const { MovieService } = await import('./movies/movie.service');
    const moduleRef = await this.lazyModuleLoader.load(() => MovieModule);
    const movieService = moduleRef.get(MovieService);
    return movieService.findById(id);
  }

  @Get('movie-lazy-all')
  async getMovieAll() {
    if (!isLazy) return {}
    const { MovieModule } = await import('./movies/movie.module');
    const { MovieService } = await import('./movies/movie.service');
    const moduleRef = await this.lazyModuleLoader.load(() => MovieModule);
    const movieService = moduleRef.get(MovieService);
    return movieService.findAll();
  }
}
