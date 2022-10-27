import { IsInt, IsString } from 'class-validator';

export class ShoppingCartItemDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsInt()
  quantity: number;

  @IsInt()
  price: number;
}
