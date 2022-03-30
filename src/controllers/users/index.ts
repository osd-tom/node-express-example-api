import { Request, Response } from "express"
import _ from "lodash"
import { IUser } from "./../../types/user"
import User from "../../models/user"
import { sendResponse } from "../../helpers/commonResponse"
import { USER_MSG, CODE } from "../../lang/response"

const getUserList = async (request: Request, response: Response): Promise<void> => {
  try {
    const userList: IUser[] = await User.find()
    sendResponse(response, CODE.SUCCESS, USER_MSG.LISTS.GET_SUCCESS, { userList })
  } catch (error) {
    sendResponse(response, CODE.FAILURE, USER_MSG.LISTS.GET_FAILURE, {})
  }
}

const getUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const { params: { id } } = request

    const user: IUser | null = await User.findById(id)
    if (_.isEmpty(user)) {
      sendResponse(response, CODE.SUCCESS, USER_MSG.USER.USER_NOT_FOUND, {})
    } else {
      sendResponse(response, CODE.SUCCESS, USER_MSG.USER.GET_USER_SUCCESS, { user })
    }
  } catch (error) {
    sendResponse(response, CODE.SUCCESS, USER_MSG.USER.GET_USER_FAILURE, {})
  }
}

const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const body = request.body as Pick<IUser, "name" | "email" | "phoneNumber" | "dob" | "password">
    const params = {
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dob: body.dob,
      password: body.password
    }

    const userItem: IUser = new User(params)
    const newUser: IUser = await userItem.save()
    const userList: IUser[] = await User.find()
    sendResponse(response, CODE.SUCCESS, USER_MSG.USER.CREATE_SUCCESS, { newUser, userList })
  } catch (error) {
    sendResponse(response, CODE.FAILURE, USER_MSG.USER.CREATE_FAILURE, {})
  }
}

const updateUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = request

    const user: IUser | null = await User.findById(id)
    if (_.isEmpty(user)) {
      sendResponse(response, CODE.FAILURE, USER_MSG.USER.USER_NOT_FOUND, {})
    } else {
      await User.findByIdAndUpdate({ _id: id }, body)
      const userList: IUser[] = await User.find()
      sendResponse(response, CODE.SUCCESS, USER_MSG.USER.UPDATE_SUCCESS, { userList })
    }
  } catch (error) {
    sendResponse(response, CODE.FAILURE, USER_MSG.USER.UPDATE_FAILURE, {})
  }
}

const deleteUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const { params: { id } } = request

    const user: IUser | null = await User.findById(id)
    if (_.isEmpty(user)) {
      sendResponse(response, CODE.FAILURE, USER_MSG.USER.USER_NOT_FOUND, {})
    } else {
      await User.findByIdAndRemove({ _id: id })
      const userList: IUser[] = await User.find()
      sendResponse(response, CODE.SUCCESS, USER_MSG.USER.DELETE_SUCCESS, { userList })
    }
  } catch (error) {
    sendResponse(response, CODE.FAILURE, USER_MSG.USER.DELETE_FAILURE, {})
  }
}

export { getUserList, getUser, createUser, updateUser, deleteUser }