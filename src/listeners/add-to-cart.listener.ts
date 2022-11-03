import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AddToCartEvent } from 'src/events';

@Injectable()
export class AddToCartListener {
  @OnEvent('add.to.cart')
  handleAddToCart(event: AddToCartEvent) {
    console.log('EVENT: ', event);
  }
}
