/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/product-create.dto/product-create.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import * as tokenPayloadInterface from '../auth/token-payload.interface';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { extname } from 'path';
import { Multer, diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: tokenPayloadInterface.TokenPayload,
  ) {
    try {
      return await this.productsService.create(createProductDto, user.userId);
    } catch (error) {
      console.log('err----', error);
      throw new Error('Error creating product');
    }
  }

  @Post('/:productId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/products',
        filename: (req, file, cb) => {
          cb(null, `${req.params.productId}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }), // Accept only image files
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {
    return { message: 'Image uploaded successfully', filename: _file.filename };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProducts() {
    return this.productsService.getProducts();
  }
}
