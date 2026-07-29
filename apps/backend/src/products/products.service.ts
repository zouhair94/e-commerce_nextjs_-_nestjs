import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from 'generated/prisma/client';
import { CreateProductDto } from './dto/product-create.dto/product-create.dto';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateProductDto, user: string): Promise<Product> {
    return await this.prismaService.product.create({
      data: {
        ...data,
        userId: String(user),
      },
    });
  }

  async getProducts() {
    const products = await this.prismaService.product.findMany();
    const productsWithImage = await Promise.all(
      products.map(async (product) => {
        const imageExists = await this.imageExists(product.id);
        return {
          ...product,
          imageUrl: imageExists,
        };
      }),
    );
    return productsWithImage;
  }

  private async imageExists(productId: string) {
    try {
      await fs.access(
        join(__dirname, '../../', `public/products/${productId}.jpg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async findOne(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return product;
  }
}
