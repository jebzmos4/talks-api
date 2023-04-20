import { IsNotEmpty } from 'class-validator';

export class TalkDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  meetingLink: string;
}
