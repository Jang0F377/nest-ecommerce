import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRUDService } from 'src/common/services/crud.service';
import { ShoppingCartDto } from 'src/models/dto/shopping-cart.dto';
import { Product } from 'src/models/product.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item.model';
import { ShoppingCart } from 'src/models/shopping-cart.model';
import { retry, Task } from 'src/utils/retry';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: Model<ShoppingCart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private crudService: CRUDService,
  ) {}

  async addItemToCart(id: string, item: ShoppingCartItem) {
    const task: Task<ShoppingCart> = {
      run: async () => {
        const addToCart = (cart: ShoppingCartDto | null) => {
          cart = cart ?? new this.shoppingCartModel({ userId: id });
          cart.items = cart.items ?? [];
          cart.items.push(item);
          return cart;
        };
        const result = await this.crudService.create(
          addToCart,
          this.shoppingCartModel,
        );
        return {
          done: result != null,
          value: result,
        };
      },
      description: `Add Item to Cart for ${id}`,
    };
    return retry(task, { maxTries: 10, interval: 10 });
  }
}
