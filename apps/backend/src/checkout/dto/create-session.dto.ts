/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  productId: string;
  /* quantity: number;
  successUrl: string;
  cancelUrl: string; */
}
