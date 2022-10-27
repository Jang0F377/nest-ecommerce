import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShoppingCartItem } from './shopping-cart-item.model';

@Schema()
export class ShoppingCart extends Document {
  @Prop()
  userId?: string;

  @Prop([ShoppingCartItem])
  items?: ShoppingCartItem[] = [];
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
