import { Module } from '@nestjs/common';
import { TalkModule } from "../talk/talk.module";
import { AttendeeModule } from "../attendee/attendee.module";
import { ChatGateway } from "../chat/chat.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
    TalkModule, AttendeeModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
