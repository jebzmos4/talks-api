import { Module } from '@nestjs/common';

import { TalkController } from "./talk.controller";
import { TalkService } from "./talk.service";
import { Talk, TalkSchema } from "./schemas/talk.model";
import { MongooseModule } from "@nestjs/mongoose";
import { TalkRepository } from "./talk.repository";
import { AttendeeModule } from "../attendee/attendee.module";

@Module({
  imports: [    MongooseModule.forFeature([
    {
      name: Talk.name,
      schema: TalkSchema,
    },
  ]),
    AttendeeModule,
  ],
  controllers: [TalkController],
  providers: [TalkService, TalkRepository],
  exports: [TalkService],
})

export class TalkModule {}
