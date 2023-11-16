import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

describe('PaymentController', () => {
  let controller: PaymentController;
  let paymentService: PaymentService;

  const requestMock = {
    query: {}
  } as unknown as Request;

  const responseChildMock = {
    send: jest.fn((x) => x)
  }

  const responseMock = {
    status: jest.fn((x) => responseChildMock), 
    send: jest.fn((x) => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'PAYMENT_SERVICE', useValue: { savePayment: jest.fn((x) => x) } }
      ],
      controllers: [PaymentController],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    paymentService = module.get<PaymentService>('PAYMENT_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined a payment service', () => {
    expect(paymentService).toBeDefined();
  });

  it('should return status of 400', () => {
    controller.getAll(requestMock, responseMock);
    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseChildMock.send).toHaveBeenCalledWith({ message: 'Missing page or limit parameter' });
  });

  it('should return status of 200 with query', () => {
    requestMock.query = { page: '1', limit: '10' };
    controller.getAll(requestMock, responseMock);
    expect(responseMock.send).toHaveBeenCalledWith(200);
  });

  describe('create payment', () => {
    it('should return a successfull response', async () => {
      jest.spyOn(paymentService, 'savePayment').mockImplementationOnce(async () => { 
        return { id: 1, status: 'success' }
      });
      const response = await controller.create({
        email: 'test1@mail.com',
        price: 10
      });
      expect(response).toStrictEqual({ id: 1, status: 'success' });
    });

    it('should return a badrequest response', async () => {
      jest.spyOn(paymentService, 'savePayment').mockImplementationOnce(() => {
        throw new BadRequestException();
      });
      try {
        const response = await controller.create({
          email: 'test100@mail.com',
          price: 10
        });
        expect(response).toStrictEqual({ status: 'success' });
      } catch (error) {
      }
    });
  });
});
