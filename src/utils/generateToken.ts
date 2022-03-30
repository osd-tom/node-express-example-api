import * as jwt from "jsonwebtoken"
import { IUser } from "../types/user"
import { IDataStoredInToken } from "./../types/token"

export const createToken = async (user: IUser) => {
  const expiresIn = 60 * 60
  const secret = process.env.JWT_SECRET
  const dataStoredInToken: IDataStoredInToken = {
    _id: user._id,
  }
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, <string>secret, { expiresIn }),
  }
}