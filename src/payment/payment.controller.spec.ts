import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentController } from './payment.controller';

describe('PaymentController', () => {
  let controller: PaymentController;

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
      controllers: [PaymentController],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
});
