import { Schema } from "mongoose";
import { hash, compare } from 'bcryptjs';
import { User } from "./user.model";

export interface IUserSchema {
  comparePassword(password: string): Promise<boolean>
}

export const UserSchema = new Schema<IUserSchema>({
  name: String,
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  document: String,
  age: Number,
  password: String,
  active: {
    type: Boolean,
    default: true
  }
});

UserSchema.pre<User>('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await hash(this.password, 8);
});

UserSchema.methods = {
  comparePassword(password: string) {
    return compare(password, this.password)
  },
}