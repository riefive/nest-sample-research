import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MovieService, Movie } from './movie.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('movie')
@Public()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovie(@Query('id', ParseIntPipe) id: number): Movie {
    return this.movieService.findById(id);
  }

  @Get('all')
  getMovieAll(): Movie[] {
    return this.movieService.findAll();
  }
}