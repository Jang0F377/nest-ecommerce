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
    Logger.log('EVENT EMITTED');
    // Product check takes place before event,
    // So just need to make sure user exists
    const { belongsTo, productId } = event;
    const findUser = await this.crudService.findOne(
      { _id: belongsTo },
      this.userModel,
    );
    if (!findUser) {
      throw new NotFoundException();
    }
    const itemExists = findUser.shoppingCart.find(x => x.name === event.name);
    if (itemExists) {
      // ADD LOGIC TO INCREASE QUANTITY
      console.log('EXISTS');
      return await this.crudService.updateOne(
        { _id: belongsTo, 'shoppingCart.name': event.name },
        { $inc: { 'shoppingCart.$.quantity': 1 } },
        this.userModel,
      );
    }
    const item: ShoppingCartItemDto = {
      productId: productId,
      name: event.name,
      quantity: event.quantity,
      price: event.price,
    };
    return await this.crudService.updateOne(
      { _id: belongsTo },
      { $push: { shoppingCart: item } },
      this.userModel,
    );
  }
}
