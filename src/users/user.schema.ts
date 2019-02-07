import { Schema } from "mongoose";
import { hash, compare } from 'bcryptjs';
import { User } from "./user.model";

export const UserSchema = new Schema({
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