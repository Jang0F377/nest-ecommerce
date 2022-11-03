import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class ProductDto {
  @IsOptional()
  _id?: mongoose.Schema.Types.ObjectId;

  @IsString({ message: 'Product name must be a string' })
  @IsNotEmpty({ message: 'Product must have a name' })
  name: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Price must be a number' },
  )
  @IsNotEmpty({ message: 'Price cannot be empty' })
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Image uri must be string if present' })
  image?: string;

  @IsNotEmpty({ message: 'Description must be present' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Count in stock cannot be empty' })
  countInStock: number;

  @IsBoolean()
  onSale = false;

  @IsOptional()
  details?: Record<any, any>;
}
