import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Attendee, AttendeeDocument } from "./schemas/attendee.model";

export class AttendeeRepository {
  constructor(
    @InjectModel(Attendee.name)
    private readonly attendeeModel: Model<AttendeeDocument>,
  ) {}

  public create(
    talk
  ): Promise<AttendeeDocument> {
    return this.attendeeModel.create(talk);
  }

  public fetchById(id: string): Promise<AttendeeDocument | null> {
    return this.attendeeModel
      .findById(new ObjectId(id))
      .exec();
  }

  public findOne(
    filter: FilterQuery<AttendeeDocument>,
  ): Promise<AttendeeDocument | null> {
    return this.attendeeModel.findOne(filter).exec();
  }

  public findAll(): Promise<Array<AttendeeDocument> | null> {
    return this.attendeeModel.find().exec();
  }

  public find(filter: FilterQuery<AttendeeDocument>): Promise<Array<AttendeeDocument> | null> {
    return this.attendeeModel.find(filter).exec();
  }
}
