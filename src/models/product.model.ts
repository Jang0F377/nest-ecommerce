import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  image?: string;

  @Prop()
  description: string;

  @Prop()
  countInStock: number;

  @Prop({ type: Boolean, default: false })
  onSale = false;

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  details?: Record<any, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
