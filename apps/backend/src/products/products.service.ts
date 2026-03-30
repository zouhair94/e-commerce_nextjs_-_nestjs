import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from 'generated/prisma/client';
import { CreateProductDto } from './dto/product-create.dto/product-create.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateProductDto): Promise<Product> {
    return await this.prismaService.product.create({ data });
  }
}
