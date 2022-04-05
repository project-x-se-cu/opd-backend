import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DraftMedicinePlanDocument = DraftMedicinePlan & Document;

@Schema({ collection: 'draftMedicinePlan', versionKey: false })
export class DraftMedicinePlan {
  @Prop()
  medicineName: String;

  @Prop()
  orderAmount: Number;

  @Prop()
  dosage: Number;

  @Prop()
  timesOfDay: Array<String>;

  @Prop()
  meals: Array<String>;

  @Prop()
  remark: String;

  @Prop()
  prescriptionId: String;
}

export const DraftMedicinePlanEntity = SchemaFactory.createForClass(DraftMedicinePlan);