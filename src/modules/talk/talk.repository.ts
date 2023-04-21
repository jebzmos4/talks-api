import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Talk, TalkDocument } from "./schemas/talk.model";

export class TalkRepository {
  constructor(
    @InjectModel(Talk.name)
    private readonly talkModel: Model<TalkDocument>,
  ) {}

  public create(
    talk
  ): Promise<TalkDocument> {
    return this.talkModel.create(talk);
  }

  public fetchById(id: string): Promise<TalkDocument | null> {
    return this.talkModel
      .findById(new ObjectId(id))
      .exec();
  }

  public findOne(
    filter: FilterQuery<TalkDocument>,
  ): Promise<TalkDocument | null> {
    return this.talkModel.findOne(filter).exec();
  }

  public findAll(): Promise<Array<TalkDocument> | null> {
    return this.talkModel.find().exec();
  }

  public find(filter: FilterQuery<TalkDocument>): Promise<Array<TalkDocument> | null> {
    return this.talkModel.find(filter).exec();
  }

  public updateOne(
    filter: FilterQuery<TalkDocument>,
    data: Partial<Talk>,
  ): Promise<TalkDocument | null> {
    return this.talkModel
      .findOneAndUpdate(filter, { $set: data }, { new: true })
      .exec();
  }

  public delete(query: FilterQuery<TalkDocument>) {
    return this.talkModel.deleteOne(query).exec();
  }
}
