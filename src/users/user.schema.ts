import { Schema } from "mongoose";
import { hash } from 'bcryptjs';
import { User } from "./user.model";

export const UserSchema = new Schema({
  name: String,
  document: String,
  age: Number,
  password: String,
});

UserSchema.pre<User>('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await hash(this.password, 8);
});