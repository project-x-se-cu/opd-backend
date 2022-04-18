import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type PrescriptionDocument = Prescription & Document;

@Schema({ collection: 'prescription', versionKey: false, timestamps: true })
export class Prescription {

  @Prop()
  status: string;

  @Prop()
  patientId: string;

  @Prop()
  doctorId: string;
}

export const PrescriptionEntity = SchemaFactory.createForClass(Prescription);