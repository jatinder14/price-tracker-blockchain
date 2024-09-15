/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Alert } from './alert.entity';
import { CreateAlertDto } from './create-alert.dto';
import { PriceService } from '../price/price.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    private priceService: PriceService,
    private emailService: EmailService,
  ) {}

  async createAlert(createAlertDto: CreateAlertDto): Promise<Alert> {
    const alert = new Alert();
    alert.chain = createAlertDto.chain;
    alert.targetPrice = createAlertDto.targetPrice;
    alert.email = createAlertDto.email;
    alert.triggered = false;

    const savedAlert = await this.alertRepository.save(alert);

    return savedAlert;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async checkAlerts() {
    const alerts = await this.alertRepository.find({
      where: { triggered: false },
    });

    for (const alert of alerts) {
      await this.monitorAlert(alert);
    }
  }

  private async monitorAlert(alert: Alert) {
      const currentPrice = await this.priceService.getCurrentPrice(alert.chain);
      console.log(`Current price for ${alert.chain}: ${currentPrice}`);

    if (!alert.triggered && currentPrice >= alert.targetPrice) {
      await this.emailService.sendPriceAlert(
        alert.chain,
        alert.targetPrice,
        alert.email,
      );
      alert.triggered = true;
      await this.alertRepository.save(alert);
    }
  }
}
