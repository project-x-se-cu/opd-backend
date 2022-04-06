import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicineDocument = Medicine & Document;

@Schema({ collection: 'medicine', versionKey: false })
export class Medicine {
  
  @Prop()
  name: string;

  @Prop()
  weight: number;
}

export const MedicineEntity = SchemaFactory.createForClass(Medicine);