/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PriceService } from './price.service';
import { EmailService } from '../email/email.service';
import { Price } from './price.entity';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceService,
        {
          provide: getRepositoryToken(Price),
          useValue: {
            // Mock the repository methods used in PriceService
            find: jest.fn(),
            save: jest.fn(),
            // Add other methods as needed
          },
        },
        {
          provide: EmailService,
          useValue: {
            // Mock the EmailService methods used in PriceService
            sendAlert: jest.fn(),
            // Add other methods as needed
          },
        },
      ],
    }).compile();

    service = module.get<PriceService>(PriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});