import { LazyModuleLoader } from '@nestjs/core';
import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ICommonService } from './interfaces/common.interface';

@Controller()
@Public()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private lazyModuleLoader: LazyModuleLoader
  ) {}

  private async getBookService(): Promise<ICommonService> {
    const { BookModule } = await import('./books/book.module');
    const { BookService } = await import('./books/book.service');
    const moduleRef = await this.lazyModuleLoader.load(() => BookModule);
    const bookService = moduleRef.get(BookService);
    return bookService;
  }

  private async getMovieService(): Promise<ICommonService> {
    const { MovieModule } = await import('./movies/movie.module');
    const { MovieService } = await import('./movies/movie.service');
    const moduleRef = await this.lazyModuleLoader.load(() => MovieModule);
    const movieService = moduleRef.get(MovieService);
    return movieService;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('book-lazy')
  async getBook(@Query('id', ParseIntPipe) id: number) {
    const bookService = await this.getBookService();
    return bookService.findById(id);
  }

  @Get('book-lazy-all')
  async getBookAll() {
    const bookService = await this.getBookService();
    return bookService.findAll();
  }

  @Get('movie-lazy')
  async getMovie(@Query('id', ParseIntPipe) id: number) {
    const movieService = await this.getMovieService();
    return movieService.findById(id);
  }

  @Get('movie-lazy-all')
  async getMovieAll() {
    const movieService = await this.getMovieService();
    return movieService.findAll();
  }
}
