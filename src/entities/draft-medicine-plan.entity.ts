import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DraftMedicinePlanDocument = DraftMedicinePlan & Document;

@Schema({ collection: 'draftMedicinePlan', versionKey: false, timestamps: true })
export class DraftMedicinePlan {
  
  @Prop()
  medicineName: string;

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

export const DraftMedicinePlanEntity = SchemaFactory.createForClass(DraftMedicinePlan);