import { IUser } from "./../types/user"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export default model<IUser>("User", userSchema)
