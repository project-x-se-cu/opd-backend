import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecieptDocument = Reciept & Document;

@Schema({ collection: 'reciept', versionKey: false, timestamps: true })
export class Reciept {
  
  @Prop()
  refId: string;

  @Prop()
  amount: number;

  @Prop()
  bank: string;

  @Prop({ select: false })
  invoiceId: string;
}

export const RecieptEntity = SchemaFactory.createForClass(Reciept);