import { IsNotEmpty } from 'class-validator';

export class AddAttendeeDto {
  @IsNotEmpty()
  talkId: string;

  @IsNotEmpty()
  attendeeId: string;
}
