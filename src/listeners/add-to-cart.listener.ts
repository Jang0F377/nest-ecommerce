import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { AddToCartEvent } from 'src/events';

@Injectable()
export class AddToCartListener {
  constructor() {}
  @OnEvent('add.to.cart')
  handleAddToCart(event: AddToCartEvent) {
    console.log('EVENT: ', event);
  }
}
