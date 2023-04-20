import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";


@Schema()
export class Attendee {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  address!: string;

  @Prop({ type:  String, enum: ['MALE', 'FEMALE', 'male', 'female']})
  gender!: string;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);

export type AttendeeDocument = HydratedDocument<Attendee>;
