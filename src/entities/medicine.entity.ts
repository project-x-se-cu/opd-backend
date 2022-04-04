import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicineDocument = Medicine & Document;

@Schema({ collection: 'medicine', versionKey: false })
export class Medicine {

  @Prop()
  name: String;

  @Prop()
  weight: Number;
}

export const MedicineEntity = SchemaFactory.createForClass(Medicine);