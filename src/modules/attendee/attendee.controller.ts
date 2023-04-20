import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { AttendeeDto } from './attendee.dto';

@Controller('attendees')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Post()
  async create(@Body() attendeeDto: AttendeeDto) {
    return this.attendeeService.create(attendeeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.attendeeService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.attendeeService.findAll();
  }
}
