import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicinePlanDocument = MedicinePlan & Document;

@Schema({ collection: 'medicinePlan', versionKey: false, timestamps: true })
export class MedicinePlan {
  
  @Prop()
  medicineName: string;

  @Prop()
  properties: string;

  @Prop()
  amount: number;

  @Prop()
  dosage: number;

  @Prop()
  dosageTimes: string[];

  @Prop()
  dosageMeals: string[];

  @Prop()
  remark: string;

  @Prop()
  status: string;

  @Prop()
  prescriptionId: string;
}

export const MedicinePlanEntity = SchemaFactory.createForClass(MedicinePlan);