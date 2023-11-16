import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentController {
    @Get()
    getAll(@Req() request: Request, @Res() response: Response) {
        const { page, limit } = request.query
        if (!page || !limit) {
            response
                .status(400)
                .send({ message: 'Missing page or limit parameter' })
        } else {
            response.send(200)
        }
    }
}
