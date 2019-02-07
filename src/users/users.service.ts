import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QueryDto } from './query.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find({}).select({ password: false }).exec();
  }
  
  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).select({ password: false }).exec();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async customQuery(query: QueryDto): Promise<User[]> {
    return await this.userModel.find(query.terms, query.fields).exec();
  }

  async addUser(user: UserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
