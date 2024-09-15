/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlertService } from './alert.service';
import { PriceService } from '../price/price.service';
import { EmailService } from '../email/email.service';
import { Alert } from './alert.entity';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertService,
        {
          provide: getRepositoryToken(Alert),
          useValue: {
            // Mock the repository methods used in AlertService
            find: jest.fn(),
            save: jest.fn(),
            // Add other methods as needed
          },
        },
        {
          provide: PriceService,
          useValue: {
            // Mock the PriceService methods used in AlertService
            getCurrentPrice: jest.fn(),
            // Add other methods as needed
          },
        },
        {
          provide: EmailService,
          useValue: {
            // Mock the EmailService methods used in AlertService
            sendPriceAlert: jest.fn(),
            // Add other methods as needed
          },
        },
      ],
    }).compile();

    service = module.get<AlertService>(AlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});