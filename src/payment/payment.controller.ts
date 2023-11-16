import { Controller, Body, Get, Post, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { InsertPaymentDto } from '../interfaces/payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(
        @Inject('PAYMENT_SERVICE')
        private readonly paymentService: PaymentService
    ) {}

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
    
    @Post('create')
    async create(@Body() insertPaymentDto: InsertPaymentDto) {
       const response = await this.paymentService.savePayment(insertPaymentDto)
       return response
    }
}
