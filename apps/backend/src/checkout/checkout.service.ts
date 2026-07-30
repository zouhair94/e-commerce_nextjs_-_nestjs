/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

  async handleCheckoutWebhook(event: any) {
    if (event.type !== 'checkout.session.completed') {
      return;
    }

    const session = await this.stripe.checkout.sessions.retrieve(
      event.data.object.id,
    );
    if (!session.metadata || !session.metadata.productId) {
      throw new Error('Product ID not found in session metadata');
    }
    await this.productsService.update(session.metadata.productId, {
      sold: true,
    });
  }
}
