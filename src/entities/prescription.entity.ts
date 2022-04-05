import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DraftMedicinePlan } from './draft-medicine-plan.entity';

export type PrescriptionDocument = Prescription & Document;

@Schema({ collection: 'prescription', versionKey: false })
export class Prescription {

  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  status: String;

  @Prop()
  draftMedicinePlans: Array<DraftMedicinePlan>;
}

export const PrescriptionEntity = SchemaFactory.createForClass(Prescription);