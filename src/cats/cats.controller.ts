import { Controller, Get, Post, Param, Query, Res, Redirect, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('cats')
@Public()
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    create(): string {
        return 'This action adds a new cat';
    }

    @Get()
    findAll(): string {
        return this.catsService.findAll();
    }

    // use parameter
    @Get('detail/:id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }

    // use http status
    @Get('array')
    findAllArray(@Res() res: Response) {
       res.status(HttpStatus.OK).json([]);
    }

    // use wildcard
    @Get('ab*cd')
    findAllWild() {
        return 'This route uses a wildcard';
    }

    // redirect function
    @Get('redirect')
    @Redirect('/cats/abcd', 301)
    redirect() {
        return true
    }

    // use query
    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
}
