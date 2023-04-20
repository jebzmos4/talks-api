import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

@Schema()
export class Talk {
  @Prop({ type: String, required: true, unique: true })
  title!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: String, required: true, unique: true })
  meetingLink!: string;

  @Prop({ type: String })
  attendeeId: string;
}

export const TalkSchema = SchemaFactory.createForClass(Talk);

export type TalkDocument = HydratedDocument<Talk>;
