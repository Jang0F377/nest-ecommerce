import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { ROLES } from 'src/utils/constants';
import { ShoppingCart } from './shopping-cart.model';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    type: Array,
    default: [],
  })
  shoppingCart: ShoppingCart;

  @Prop({
    required: false,
  })
  firstName?: string;

  @Prop({
    required: false,
  })
  lastName?: string;

  @Prop(ROLES)
  role: ROLES;
}

export const UserSchema = SchemaFactory.createForClass(User);
