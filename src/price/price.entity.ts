/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Price {
  @ApiProperty({ description: 'The unique identifier of the price entry' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The blockchain', enum: ['ethereum', 'polygon'] })
  @Column()
  chain: string;

  @ApiProperty({ description: 'The price in USD' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'The timestamp of the price entry' })
  @Column()
  timestamp: Date;
}
