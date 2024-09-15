/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';

describe('AlertController', () => {
  let controller: AlertController;
  let alertService: AlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertController],
      providers: [
        {
          provide: AlertService,
          useValue: {
            // Mock the methods of AlertService here
            // For example:
            // findAll: jest.fn(() => []),
          },
        },
      ], // Add the AlertService provider
    }).compile();
  
    controller = module.get<AlertController>(AlertController);
    alertService = module.get<AlertService>(AlertService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});