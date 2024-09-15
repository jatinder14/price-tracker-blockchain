/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import Moralis from 'moralis';
import { Price } from './price.entity';
import { EmailService } from '../email/email.service';
console.log("---jaitnder----",process.env.MORALIS_API_KEY)

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    private emailService: EmailService,
  ) {}

  @Cron('*/5 * * * *')
  async trackPrices() {
    const chains = ['ethereum', 'polygon'];
    for (const chain of chains) {
      const price = await this.fetchPrice(chain);
      await this.savePrice(chain, price);
      await this.checkPriceIncrease(chain, price);
    }
  }
  private async fetchPrice(chain: string): Promise<number> {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address:
        chain === 'ethereum'
          ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
          : '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      chain: chain === 'ethereum' ? '0x1' : '0x89',
    });
    return response.result.usdPrice;
  }

  private async savePrice(chain: string, price: number) {
    const priceEntity = new Price();
    priceEntity.chain = chain;
    priceEntity.price = price;
    priceEntity.timestamp = new Date();
    await this.priceRepository.save(priceEntity);
  }

  private async checkPriceIncrease(chain: string, currentPrice: number) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const oldPrice = await this.priceRepository.findOne({
      where: { chain, timestamp: oneHourAgo },
      order: { timestamp: 'DESC' },
    });

    if (oldPrice && currentPrice > oldPrice.price * 1.03) {
      await this.emailService.sendAlert(chain, oldPrice.price, currentPrice);
    }
  }

  async getHourlyPrices(chain: string): Promise<Price[]> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.priceRepository.find({
      where: {
        chain,
        timestamp: MoreThanOrEqual(twentyFourHoursAgo),
      },
      order: {
        timestamp: 'DESC',
      },
    });
  }

  async getCurrentPrice(chain: string): Promise<number> {
    // const price = await this.priceRepository.findOne({
    //   where: { chain },
    //   order: { timestamp: 'DESC' },
    // });
    // return price.price;
    const price = await this.fetchPrice(chain);
    return price;
  }
}
