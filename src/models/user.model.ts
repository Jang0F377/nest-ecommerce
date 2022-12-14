import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLES } from 'src/utils/constants';
import { ShoppingCartItem } from './shopping-cart-item.model';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    type: Array,
    default: [],
  })
  shoppingCart?: ShoppingCartItem[];

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
