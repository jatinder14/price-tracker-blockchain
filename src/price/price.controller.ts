/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PriceService } from './price.service';
import { Price } from './price.entity';

@ApiTags('prices')
@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get(':chain')
  @ApiOperation({ summary: 'Get hourly prices for a chain' })
  @ApiParam({ name: 'chain', enum: ['ethereum', 'polygon'] })
  @ApiResponse({ status: 200, description: 'Return hourly prices', type: [Price] })
  async getHourlyPrices(@Param('chain') chain: string): Promise<Price[]> {
    return this.priceService.getHourlyPrices(chain);
  }
}