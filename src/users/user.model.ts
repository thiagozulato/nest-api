import { Document } from "mongoose";

export interface User extends Document {
  name: string,
  email: string,
  document: string,
  age: number,
  password: string,
  active: boolean,
}