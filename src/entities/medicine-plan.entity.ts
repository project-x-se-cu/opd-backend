import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicinePlanDocument = MedicinePlan & Document;

@Schema({ collection: 'medicinePlan', versionKey: false, timestamps: true })
export class MedicinePlan {
  
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

export const MedicinePlanEntity = SchemaFactory.createForClass(MedicinePlan);