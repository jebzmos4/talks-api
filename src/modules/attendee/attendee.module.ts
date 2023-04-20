import { Module } from '@nestjs/common';

import { AttendeeController } from "./attendee.controller";
import { AttendeeService } from "./attendee.service";
import { AttendeeRepository } from "./attendee.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Attendee, AttendeeSchema } from "./schemas/attendee.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attendee.name,
        schema: AttendeeSchema,
      },
    ]),
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService, AttendeeRepository],
  exports: [AttendeeService],
})

export class AttendeeModule {}
