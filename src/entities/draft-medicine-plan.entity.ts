import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DraftMedicinePlanDocument = DraftMedicinePlan & Document;

@Schema({ collection: 'draftMedicinePlan', versionKey: false, timestamps: true })
export class DraftMedicinePlan {
  
  @Prop()
  medicineName: string;

  @Prop()
  orderAmount: number;

  @Prop()
  dosage: number;

  @Prop()
  timesOfDay: string[];

  @Prop()
  meals: string[];

  @Prop()
  remark: string;

  @Prop()
  status: string;

  @Prop({ select: false })
  prescriptionId: string;
}

export const DraftMedicinePlanEntity = SchemaFactory.createForClass(DraftMedicinePlan);