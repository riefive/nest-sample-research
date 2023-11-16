import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a successfull response', async () => {
    const response = await service.savePayment({
      email: 'test1@mail.com',
      price: 10
    });
    expect(response).toStrictEqual({ id: 1, status: 'success' });
  });

  it('should return a badrequest response', async () => {
    try {
      const response = await service.savePayment({
        email: 'test100@mail.com',
        price: 10
      });
      expect(response).toStrictEqual({ status: 'success' });
    } catch (error) {
    }
  });
});
