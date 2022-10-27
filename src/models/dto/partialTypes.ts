import { PartialType } from '@nestjs/mapped-types';
import { User } from '../user.model';
import { ShoppingCartItemDto } from './shopping-cart-item.dto';
import { ShoppingCartDto } from './shopping-cart.dto';
import { UserDto } from './user.dto';

export class PartialUser extends PartialType(UserDto) {}
export class PartialShoppingCart extends PartialType(ShoppingCartDto) {}
export class PartialShoppingCartItem extends PartialType(ShoppingCartItemDto) {}
