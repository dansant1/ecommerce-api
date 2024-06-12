import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OrderDocument extends Document {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  productList: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
