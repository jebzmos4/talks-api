import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";
import { ObjectId } from "mongodb";

@Schema()
export class Talk {
  @Prop({ type: String, required: true, unique: true })
  title!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: String, required: true, unique: true })
  meetingLink!: string;

  @Prop({ type: Array<string> })
  attendees: string[] = [];

  @Prop({ type: Boolean, default: false })
  removed: boolean = false;
}

export const TalkSchema = SchemaFactory.createForClass(Talk);

export type TalkDocument = HydratedDocument<Talk>;
