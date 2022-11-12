import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRUDService } from 'src/common/services/crud.service';
import { AddToCartEvent } from 'src/events';
import { ShoppingCartItemDto } from 'src/models/dto/shopping-cart-item.dto';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { UserManagementService } from 'src/user-management/user-management.service';

@Injectable()
export class AddToCartListener {
  constructor(
    private crudService: CRUDService,
    @Inject(UserManagementService) private userService: UserManagementService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  @OnEvent('add.to.cart')
  async handleAddToCart(event: AddToCartEvent) {
    let updateUser;
    Logger.log('EVENT EMITTED');
    // Product check takes place before event,
    // So just need to make sure user exists
    const { belongsTo } = event;
    const findUser = await this.crudService.findOne(
      { _id: belongsTo },
      this.userModel,
    );
    if (!findUser) {
      throw new NotFoundException();
    }
    const exists = findUser.shoppingCart.find(x => x.name === event.name);
    if (exists) {
      // ADD LOGIC TO INCREASE QUANTITY
      console.log(exists);
      updateUser = await this.crudService.updateOne(
        { _id: event.belongsTo },
        {
          /* TODO */
        },
        this.userModel,
      );

      console.log(updateUser);
    }
    const item: ShoppingCartItemDto = {
      productId: event.productId,
      name: event.name,
      quantity: event.quantity,
      price: event.price,
    };
    updateUser = await this.crudService.updateOne(
      { _id: event.belongsTo },
      { $push: { shoppingCart: item } },
      this.userModel,
    );
    console.log(updateUser);
  }
}
