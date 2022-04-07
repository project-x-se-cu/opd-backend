import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

export class Summary {
  @Prop()
  serviceFee: number;

  @Prop()
  medicineFee: [];
}

@Schema({ collection: 'invoice', versionKey: false, timestamps: true })
export class Invoice {

  @Prop({ auto: true })
  _id: MongooseSchema.Types.ObjectId;
  
  @Prop()
  refId: string;

  @Prop()
  amount: number;

  @Prop()
  status: string;

  @Prop()
  summary: Summary;

  @Prop({ select: false })
  userId: string;
}

export const InvoiceEntity = SchemaFactory.createForClass(Invoice);