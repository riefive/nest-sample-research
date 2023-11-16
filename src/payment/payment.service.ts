import { Injectable, BadRequestException } from '@nestjs/common';
import { InsertPaymentDto } from '../interfaces/payment.dto';

@Injectable()
export class PaymentService {
    private users = [
        { email: 'test1@mail.com' },
        { email: 'test2@mail.com' },
        { email: 'test2@mail.com' },
    ]

    async savePayment(insertPaymentDto: InsertPaymentDto) {
        const { email } = insertPaymentDto
        const user = this.users.find((user) => user.email === email)
        if (user) {
            return { id: 1, status: 'success' }
        } else {
            throw new BadRequestException()
        }
    }
}
