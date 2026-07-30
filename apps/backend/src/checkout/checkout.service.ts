import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  constructor(
    readonly stripe: Stripe,
    readonly productsService: ProductsService,
  ) {}
  async createSession(productId: string) {
    const product = await this.productsService.findOne(productId);
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description || '',
            },
            unit_amount: product.price * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return { url: session.url };
  }
}
