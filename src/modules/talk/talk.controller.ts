import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkDto } from './dto/talk.dto';
import { AddAttendeeDto } from "./dto/add-attendee.dto";

@Controller('talks')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  async create(@Body() talkDto: TalkDto) {
    return this.talkService.create(talkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.talkService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.talkService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.talkService.findAll();
  }

  @Post('/attendee')
  async addAttendee(@Body() addAttendee: AddAttendeeDto) {
    await this.talkService.addAttendee(addAttendee);
    return { message: 'Attendee as been added to the talk' };
  }
}
