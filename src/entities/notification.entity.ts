import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ collection: 'notification', versionKey: false, timestamps: true })
export class Notification {

  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop()
  userId: string;
}

export const NotificationEntity = SchemaFactory.createForClass(Notification);