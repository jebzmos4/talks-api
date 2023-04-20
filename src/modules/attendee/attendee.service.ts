import { BadRequestException, Injectable } from "@nestjs/common";
import { AttendeeDto } from './attendee.dto';
import { AttendeeRepository } from "./attendee.repository";
import { AttendeeDocument } from "./schemas/attendee.model";

@Injectable()
export class AttendeeService {
  constructor(
    private attendeeRepository: AttendeeRepository
  ) {}

  async create(attendeeDto: AttendeeDto): Promise<AttendeeDocument> {
    const attendee = await this.attendeeRepository.findOne({ email: attendeeDto.email});
    if (attendee) throw new BadRequestException('Email already in user');
   return this.attendeeRepository.create(attendeeDto);
  }

  findAll(): Promise<Array<AttendeeDocument>> {
    return this.attendeeRepository.findAll();
  }

  findOne(id: string): Promise<AttendeeDocument> {
    return this.attendeeRepository.fetchById(id);
  }
}
