import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class InsertPaymentDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsNumberString()
    price: number
}
