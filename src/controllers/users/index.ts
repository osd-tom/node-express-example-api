import { Request, Response } from "express"
import _ from "lodash"
import bcrypt from "bcrypt"
import { IUser } from "./../../types/user"
import { sendResponse } from "../../helpers/commonResponse"
import { USER_MSG, CODE } from "../../lang/response"
import { 
  checkIsExistedUser,
  createAndSaveUser,
  deleteUserById,
  findAllUser,
  findUserBy,
  updateAndSaveUser
} from "../../services/user"
import { SALT } from "../../constants/auth/auth"

/**
 * Get user list
 * 
 * @param request 
 * @param response 
 */
const getUserList = async (request: Request, response: Response): Promise<void> => {
  try {
    const userList: IUser[] = await findAllUser(["-password"])
    sendResponse(
      response, 
      CODE.SUCCESS, 
      USER_MSG.LISTS.GET_SUCCESS, 
      { userList }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      USER_MSG.LISTS.GET_FAILURE,
      {}
    )
  }
}

/**
 * Get specific user data
 * 
 * @param request 
 * @param response 
 */
const getUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const { params: { id } } = request
    const user = await findUserBy([{_id: id}], ["-password"])

    if (_.isEmpty(user)) {
      sendResponse(
        response,
        CODE.FAILURE,
        USER_MSG.USER.USER_NOT_FOUND,
        {}
      )
    }

    sendResponse(
      response,
      CODE.SUCCESS,
      USER_MSG.USER.GET_USER_SUCCESS,
      { user }
    )
  } catch (error) {    
    sendResponse(
      response,
      CODE.SUCCESS,
      USER_MSG.USER.GET_USER_FAILURE,
      {}
    )
  }
}

/**
 * Create new user
 * 
 * @param request 
 * @param response 
 */
const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const body = request.body as Pick<IUser, "name" | "email" | "phoneNumber" | "dob" | "password">
    const params = {
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dob: body.dob,
      password: await bcrypt.hash(body.password, SALT)
    }

    const newUser: IUser = await createAndSaveUser(params)
    const userList: IUser[] = await findAllUser(["-password"])

    sendResponse(
      response,
      CODE.SUCCESS,
      USER_MSG.USER.CREATE_SUCCESS,
      { 
        newUser,
        userList
      }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      USER_MSG.USER.CREATE_FAILURE,
      {}
    )
  }
}

/**
 * Update user
 * 
 * @param request 
 * @param response 
 */
const updateUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = request

    if (!await checkIsExistedUser(id)) {
      sendResponse(
        response,
        CODE.FAILURE,
        USER_MSG.USER.USER_NOT_FOUND,
        {}
      )
    }

    const user = await updateAndSaveUser(id, body)
    sendResponse(
      response,
      CODE.SUCCESS,
      USER_MSG.USER.UPDATE_SUCCESS,
      { user }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      USER_MSG.USER.UPDATE_FAILURE,
      {}
    )
  }
}

/**
 * Delete user
 * 
 * @param request 
 * @param response 
 */
const deleteUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const { params: { id } } = request

    if (!await checkIsExistedUser(id)) {
      sendResponse(
        response,
        CODE.FAILURE,
        USER_MSG.USER.USER_NOT_FOUND,
        {}
      )
    }

    await deleteUserById(id)
    const userList: IUser[] = await findAllUser(["-password"])
    sendResponse(
      response,
      CODE.SUCCESS,
      USER_MSG.USER.DELETE_SUCCESS,
      { userList }
    )
  } catch (error) {
    sendResponse(
      response,
      CODE.FAILURE,
      USER_MSG.USER.DELETE_FAILURE,
      {}
    )
  }
}

export { 
  getUserList,
  getUser,
  createUser,
  updateUser,
  deleteUser
}