import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();
    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const result = 'test';
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
      expect(catsController.findAll()).toBe(result);
    });
  });
});
