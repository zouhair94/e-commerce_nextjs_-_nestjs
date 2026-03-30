import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/product-create.dto/product-create.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import * as tokenPayloadInterface from '../auth/token-payload.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: tokenPayloadInterface.TokenPayload,
  ) {
    return this.productsService.create(createProductDto, user.userId);
  }
}
