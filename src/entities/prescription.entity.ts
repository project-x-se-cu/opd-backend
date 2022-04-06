import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type PrescriptionDocument = Prescription & Document;

@Schema({ collection: 'prescription', versionKey: false })
export class Prescription {

  @Prop()
  status: string;
}

export const PrescriptionEntity = SchemaFactory.createForClass(Prescription);