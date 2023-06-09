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
  async removeTalk(@Param('id') id: string) {
    return this.talkService.removeTalk(id);
  }

  @Get('/active')
  async findAllActiveTalks() {
    return this.talkService.findAllActiveTalks();
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
    return this.talkService.addAttendee(addAttendee);
  }
}
