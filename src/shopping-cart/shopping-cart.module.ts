import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { CRUDService } from 'src/common/services/crud.service';
import { ProductService } from 'src/product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShoppingCart,
  ShoppingCartSchema,
} from 'src/models/shopping-cart.model';
import { Product, ProductSchema } from 'src/models/product.model';
import { User, UserSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ShoppingCartService, CRUDService, ProductService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
