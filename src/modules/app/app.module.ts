import { Module } from '@nestjs/common';
import { TalkModule } from "../talk/talk.module";
import { AttendeeModule } from "../attendee/attendee.module";
import { ChatGateway } from "../chat/chat.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "../chat/chat.module";

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
    TalkModule, AttendeeModule, ChatModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
