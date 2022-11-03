import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { PartialProduct } from 'src/models/dto/partialTypes';
import { ProductDto } from 'src/models/dto/product.dto';
import { ROLES } from 'src/utils/constants';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  getAllProducts(): Promise<ProductDto[]> {
    return this.productService.getAllProducts();
  }

  @Public()
  @Get(':id')
  getProductById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.getProductById(id);
  }

  @Public()
  @Role(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @Post()
  postNewProduct(@Body() product: ProductDto): Promise<ProductDto> {
    return this.productService.postNewProduct(product);
  }

  @Role(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @Patch(':id')
  updateProductById(
    @Param('id') id: string,
    @Body() updatedProduct: PartialProduct,
  ): Promise<PartialProduct> {
    return this.productService.updateProductById(id, updatedProduct);
  }

  @Public()
  @Role(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @Delete()
  deleteAllProducts(): Promise<ProductDto[]> {
    return this.productService.deleteAllProducts();
  }
}
