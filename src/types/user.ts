import { Document } from "mongoose"

export interface IUser extends Document {
  name: string,
  email: string,
  phoneNumber: string,
  dob: Date,
  password: string,
  isActivated: boolean
}