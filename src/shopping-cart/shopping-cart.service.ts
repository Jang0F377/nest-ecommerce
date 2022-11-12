import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRUDService } from 'src/common/services/crud.service';
import { AddToCartEvent } from 'src/events';
import { PartialProduct } from 'src/models/dto/partialTypes';
import { ShoppingCartItemDto } from 'src/models/dto/shopping-cart-item.dto';
import { ShoppingCartDto } from 'src/models/dto/shopping-cart.dto';
import { Product } from 'src/models/product.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item.model';
import { ShoppingCart } from 'src/models/shopping-cart.model';
import { ERROR_CODES } from 'src/utils/constants';
import { retry, Task } from 'src/utils/retry';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: Model<ShoppingCart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private crudService: CRUDService,
    private eventEmitter: EventEmitter2,
  ) {}

  async addItemToCart(id: string, productId: PartialProduct) {
    const findProduct = await this.crudService.findOne(
      { _id: productId },
      this.productModel,
    );

    if (!findProduct) {
      throw new NotFoundException();
    }

    if (findProduct.countInStock >= 1) {
      const addToCart = new AddToCartEvent();
      addToCart.belongsTo = id;
      addToCart.name = findProduct.name;
      addToCart.productId = findProduct._id;
      addToCart.quantity = 1;
      addToCart.price = findProduct.price;
      this.eventEmitter.emit('add.to.cart', addToCart);
      this.crudService.updateOne(
        { _id: productId },
        { $set: { countInStock: --findProduct.countInStock } },
        this.productModel,
      );
      return {
        status: HttpStatus.OK,
        message: 'Added to Cart/Product stock Updated',
      };
    }
    throw new HttpException(
      'Product out of stock, please wait for restock',
      HttpStatus.BAD_REQUEST,
    );
  }
}
