import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AddToCartEvent } from './events';

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}
  getHello(): string {
    const addToCartTest = new AddToCartEvent();
    addToCartTest.name = 'PS5';
    addToCartTest.price = 499;
    addToCartTest.productId = 'asdfsdfadfasdfa';
    addToCartTest.quantity = 1;
    this.eventEmitter.emit('add.to.cart', addToCartTest);
    return 'Hello World!';
  }
}
