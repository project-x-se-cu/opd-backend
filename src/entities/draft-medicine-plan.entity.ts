import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DraftMedicinePlanDocument = DraftMedicinePlan & Document;

@Schema({ collection: 'draftMedicinePlan' })
export class DraftMedicinePlan {
  @Prop()
  name: String;

  @Prop()
  orderAmount: Number;

  @Prop()
  dosage: Number;

  @Prop()
  timesOfDay: String[];

  @Prop()
  meals: String[];

  @Prop()
  remark: String;

  @Prop()
  prescriptionId: String;
}

export const DraftMedicinePlanEntity = SchemaFactory.createForClass(DraftMedicinePlan);