/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsEmail, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty({
    description: 'The blockchain to set the alert for',
    enum: ['ethereum', 'polygon'],
    example: 'ethereum',
  })
  @IsString()
  @IsIn(['ethereum', 'polygon'])
  chain: string;

  @ApiProperty({
    description: 'The target price to trigger the alert',
    example: 1000,
  })
  @IsNumber()
  targetPrice: number;

  @ApiProperty({
    description: 'The email address to send the alert to',
    example: 'jatinderg683@gmail.com',
  })
  @IsEmail()
  email: string;
}