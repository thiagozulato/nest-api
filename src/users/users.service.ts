import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IUserSchema } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User, IUserSchema>) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find({}).select({ password: false }).exec();
  }
  
  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).select({ password: false }).exec();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async addUser(user: UserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
