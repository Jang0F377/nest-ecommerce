import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PartialProduct } from 'src/models/dto/partialTypes';
import { ShoppingCartItemDto } from 'src/models/dto/shopping-cart-item.dto';
import { ShoppingCartDto } from 'src/models/dto/shopping-cart.dto';
import { UserManagementService } from 'src/user-management/user-management.service';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shoppingCart')
export class ShoppingCartController {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private userManagementService: UserManagementService,
  ) {}

  @Post(':id')
  addItemToCart(@Param('id') id: string, @Body() productId: PartialProduct) {
    return this.shoppingCartService.addItemToCart(id, productId);
  }

  @Delete(':id')
  clearUserCart(@Param('id') id: string) {
    return this.userManagementService.clearUserCart(id);
  }
}
