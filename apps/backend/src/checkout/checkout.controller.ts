import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('session')
  @UseGuards(JwtAuthGuard)
  async createSession(@Body() request: CreateSessionDto) {
    return await this.checkoutService.createSession(request.productId);
  }
}
