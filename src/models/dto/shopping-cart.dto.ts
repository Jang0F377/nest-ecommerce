import { IsArray, IsString } from 'class-validator';
import { ShoppingCartItemDto } from './shopping-cart-item.dto';

export class ShoppingCartDto {
  @IsString()
  userId?: string;

  @IsArray()
  items?: ShoppingCartItemDto[];
}
