import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShoppingCartItem extends Document {
  @Prop()
  productId: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
}

export const ShoppingCartItemSchema =
  SchemaFactory.createForClass(ShoppingCartItem);
