// talk-attendee.dto.ts
import { IsNotEmpty } from 'class-validator';

export class TalkAttendeeDto {
  @IsNotEmpty()
  talkId: number;

  @IsNotEmpty()
  attendeeId: number;
}
