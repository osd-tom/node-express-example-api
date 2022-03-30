import { Request, Response } from "express"
import _ from "lodash"
import bcrypt from "bcrypt"
import { IUser } from "../../types/user"
import User from "../../models/user"
import { sendResponse } from "../../helpers/commonResponse"
import { CODE, USER_MSG } from "../../lang/response"
import { createToken } from "../../utils/generateToken"

/**
 * Register
 * 
 * @param request 
 * @param response 
 */
const registration = async (request: Request, response: Response): Promise<void> => {
  try {
    const body = request.body as Pick<IUser, "name" | "email" | "phoneNumber" | "dob" | "password">
    const params = {
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dob: body.dob,
      password: await bcrypt.hash(body.password, 10)
    }

    const userEmail: IUser | null = await User.findOne({ email: body.email })
    if (userEmail) {
      sendResponse(response, CODE.FAILURE, "Email has already been taken", {})
    } else {
      const registeringUser: IUser = new User(params)
      const user: IUser = await registeringUser.save()
      await user.save()
      user.password = ""
      const token = createToken(user)
      sendResponse(response, CODE.SUCCESS, USER_MSG.USER.CREATE_SUCCESS, { token, user })
    }
  } catch (error) {
    throw error
  }
}

export { registration }