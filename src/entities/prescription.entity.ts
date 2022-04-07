import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose'

export type PrescriptionDocument = Prescription & Document;

@Schema({ collection: 'prescription', versionKey: false })
export class Prescription {

  @Prop({ auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  status: string;
}

export const PrescriptionEntity = SchemaFactory.createForClass(Prescription);