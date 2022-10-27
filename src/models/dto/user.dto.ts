import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { ObjectId } from 'mongoose';
import { ROLES } from 'src/utils/constants';
import { ShoppingCartDto } from './shopping-cart.dto';

export class UserDto {
  _id?: any;

  @IsEmail({
    message: 'Must be a valid email string',
  })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  shoppingCart?: ShoppingCartDto; //ADD TYPE

  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}
