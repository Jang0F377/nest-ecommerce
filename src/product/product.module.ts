import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/models/product.model';
import { CRUDService } from 'src/common/services/crud.service';
import { AddToCartListener } from 'src/listeners';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [ProductService, CRUDService, AddToCartListener],
  controllers: [ProductController],
})
export class ProductModule {}
