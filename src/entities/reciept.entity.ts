import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecieptDocument = Reciept & Document;

@Schema({ collection: 'reciept', versionKey: false, timestamps: true })
export class Reciept {
  
  @Prop()
  refId: string;

  @Prop()
  bank: string;

  @Prop()
  invoiceId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RecieptEntity = SchemaFactory.createForClass(Reciept);