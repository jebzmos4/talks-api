import { BadRequestException, Injectable } from "@nestjs/common";
import { TalkDto } from './dto/talk.dto';
import { TalkRepository } from "./talk.repository";
import { TalkDocument } from "./schemas/talk.model";
import { AddAttendeeDto } from "./dto/add-attendee.dto";
import { AttendeeService } from "../attendee/attendee.service";
import { ObjectId } from "mongodb";

@Injectable()
export class TalkService {
  constructor(
    readonly talkRepository: TalkRepository,
    readonly attendeeService: AttendeeService,
  ) {}

  async create(talkDto: TalkDto): Promise<TalkDocument> {
    const talk = await this.talkRepository.find({ $or: [{ title: talkDto.title }, {meetingLink: talkDto.meetingLink } ]});
    if (talk.length > 0) throw new BadRequestException('A Talk with this title or meeting link already exist');
    return this.talkRepository.create(talkDto);
  }

  findAll(): Promise<Array<TalkDocument>> {
    return this.talkRepository.findAll();
  }

  findAllActiveTalks(): Promise<Array<TalkDocument>> {
    return this.talkRepository.find({ removed: false });
  }

  findOne(id: string): Promise<TalkDocument> {
    return this.talkRepository.fetchById(id);
  }

  removeTalk(id: string): Promise<any> {
    return this.talkRepository.updateOne({ _id: id }, { removed: true })
  }

  async addAttendee(data: AddAttendeeDto): Promise<TalkDocument> {
    const talk = await this.talkRepository.fetchById(data.talkId);
    if (!talk) throw new BadRequestException('Invalid Talk ID');
    else if (talk.attendees.includes(data.attendeeId)) throw new BadRequestException('user already in call');

    const attendee = await this.attendeeService.findOne(data.attendeeId.toString());
    if (!attendee) throw new BadRequestException('Attendee ID does not exist');

    talk.attendees.push(data.attendeeId)

    return this.talkRepository.updateOne({_id: data.talkId}, { attendees: talk.attendees });
  }
}
