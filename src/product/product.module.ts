import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/models/product.model';
import { CRUDService } from 'src/common/services/crud.service';
import { AddToCartListener } from 'src/listeners';
import { User, UserSchema } from 'src/models/user.model';
import { UserManagementService } from 'src/user-management/user-management.service';
import {
  UserWithPassword,
  UserWithPasswordSchema,
} from 'src/models/user-with-password.model';
import { JWTService } from 'src/common/services/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserWithPassword.name,
        schema: UserWithPasswordSchema,
      },
    ]),
  ],
  providers: [
    ProductService,
    CRUDService,
    AddToCartListener,
    UserManagementService,
    JWTService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
