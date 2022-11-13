import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { PartialProduct } from 'src/models/dto/partialTypes';
import { ShoppingCartItemDto } from 'src/models/dto/shopping-cart-item.dto';
import { User } from 'src/models/user.model';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shoppingCart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get(':id/count')
  getShoppingCartCount(@Param('id') id: string): Promise<number> {
    return this.shoppingCartService.getShoppingCartCount(id);
  }

  @Get(':id')
  getShoppingCart(@Param('id') id: string): Promise<ShoppingCartItemDto[]> {
    return this.shoppingCartService.getShoppingCart(id);
  }

  @HttpCode(200)
  @Post(':id')
  addItemToCart(
    @Param('id') id: string,
    @Body() productId: PartialProduct,
  ): Promise<Record<string, any>> {
    return this.shoppingCartService.addItemToCart(id, productId);
  }

  @Delete(':id')
  clearUserCart(@Param('id') id: string): Promise<User> {
    return this.shoppingCartService.clearUserCart(id);
  }
}
