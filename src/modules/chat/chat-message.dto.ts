import { IsNotEmpty } from 'class-validator';

export class ChatMessageDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  // ... other properties
}
