import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicineDocument = Medicine & Document;

@Schema()
export class Medicine {
  @Prop()
  name?: String;

  @Prop()
  weight?: Number;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);