/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PriceController } from './price.controller';
import { PriceService } from './price.service'; // Import the PriceService

describe('PriceController', () => {
  let controller: PriceController;
  let priceService: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [
        {
          provide: PriceService,
          useValue: {
            // Mock the methods of PriceService here
            // For example:
            // findAll: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    controller = module.get<PriceController>(PriceController);
    priceService = module.get<PriceService>(PriceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests as needed
});
