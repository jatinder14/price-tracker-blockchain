/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PriceModule } from './price/price.module';
import { AlertModule } from './alert/alert.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Be cautious with this in production
    }),
    ScheduleModule.forRoot(),
    PriceModule,
    AlertModule,
    EmailModule,
  ],
})
export class AppModule {}