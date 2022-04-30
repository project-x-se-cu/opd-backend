import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ collection: 'profile', versionKey: false, timestamps: true })
export class Profile {
  @Prop({ auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  emailAddress: string;

  @Prop()
  role: string;

  @Prop()
  otp: string;

  @Prop()
  otpExpireAt: Date;
}

export const ProfileEntity = SchemaFactory.createForClass(Profile);
