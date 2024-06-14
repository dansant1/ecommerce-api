import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ProductDocument,
} from '../../../products/infrastructure/schemas';
@Schema({ collection: 'Orders' })
export class OrderDocument extends Document {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  total: number;

  @Prop({ type: Types.ObjectId, ref: ProductDocument.name, required: true })
  productList: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
