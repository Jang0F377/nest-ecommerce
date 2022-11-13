import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { assert } from 'src/utils/error.utils';
import { Model } from 'mongoose';
import { CRUDService } from 'src/common/services/crud.service';
import { PartialProduct } from 'src/models/dto/partialTypes';
import { ProductDto } from 'src/models/dto/product.dto';
import { Product } from 'src/models/product.model';
import { ERROR_CODES } from 'src/utils/constants';

@Injectable()
export class ProductService {
  constructor(
    private crudService: CRUDService,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const allProducts = await this.crudService.findMany(this.productModel);
    return allProducts;
  }

  async getProductById(id: string): Promise<ProductDto> {
    const findProduct = await this.crudService.findOne(
      { _id: id },
      this.productModel,
    );

    assert(findProduct, 'PRODUCT NOT FOUND', ERROR_CODES.NOT_FOUND, true);
    return findProduct;
  }

  async postNewProduct(product: ProductDto): Promise<ProductDto> {
    const doesProductExist = await this.crudService.findOne(
      { name: product.name },
      this.productModel,
    );
    assert(
      !doesProductExist,
      'PRODUCT ALREADY EXISTS',
      ERROR_CODES.CONFLICT,
      true,
    );

    const newProduct = await this.crudService.create(
      product,
      this.productModel,
    );
    return newProduct;
  }

  async updateProductById(
    id: string,
    updatedProduct: PartialProduct,
  ): Promise<PartialProduct> {
    const findProduct = await this.crudService.findOne(
      { _id: id },
      this.productModel,
    );
    assert(findProduct, 'PRODUCT DOES NOT EXIST', ERROR_CODES.NOT_FOUND);

    const updateProduct = await this.crudService.updateOne(
      { _id: id },
      { $set: updatedProduct },
      this.productModel,
    );
    return updateProduct;
  }

  async deleteAllProducts(): Promise<ProductDto[]> {
    return this.crudService.deleteMany(this.productModel);
  }
}
