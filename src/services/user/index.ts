import _ from "lodash"
import { EXCEPTION } from "../../lang/error"
import User from "../../models/user"
import { IUser } from "../../types/user"

/**
 * Get user base on query options
 * 
 * @param queryOptions 
 * @returns user list | {}
 */
const findAllUser = async (queryOptions: any | []) => {
  try {    
    if (_.isEmpty(queryOptions)) {
      return await User.find()
    }

    return await User.find().select(queryOptions)
  } catch (error) {
    throw new Error(EXCEPTION.SYSTEM.DB_CONNECTION)
  }
}

/**
 * Query user data based on parameters
 * 
 * @param queryParams 
 * @param queryOptions 
 * @returns user data | {}
 */
const findUserBy = async (queryParams: any, queryOptions: any) => {
  try {
    const query = User.find({
      $or: queryParams
    })

    if (_.isEmpty(queryOptions)) {
      return await query
    }

    return await query.select(queryOptions)
  } catch (error) {
    throw new Error(`${EXCEPTION.USER.FIND_WITH_PARAMS}: ${queryParams}`)
  }
}

/**
 * Check is existed user
 * 
 * @param userId 
 * @returns boolean 
 */
const checkIsExistedUser = async (userId: string | number) => {
  try {
    const userData: IUser | null = await User.findById(userId)
    
    if (_.isEmpty(userData)) {
      return false
    }
    return true
  } catch (error) {
    throw new Error(`${EXCEPTION.USER.FIND_WITH_ID}: ${userId}`)
  }
}

/**
 * Create new user
 * 
 * @param params 
 * @returns User
 */
const createAndSaveUser = async (params: object) => {
  try {
    const userItem: IUser = new User(params)
    const newUser: IUser = await userItem.save()
    return newUser
  } catch (error) {
    throw new Error(EXCEPTION.SYSTEM.DB_CONNECTION)
  }
}

/**
 * Update user data
 * 
 * @param userId 
 * @param params 
 * @returns user data
 */
const updateAndSaveUser = async (userId: string | number, params: object) => {
  try {
    await User.findByIdAndUpdate({ _id: userId }, params)
    const user = await findUserBy([{_id: userId}], ["-password"])
    return user
  } catch (error) {
    throw new Error(`${EXCEPTION.USER.UPDATE_WITH_ID}: ${userId}`)
  }
}

/**
 * Delete user by id
 * 
 * @param userId 
 */
const deleteUserById = async (userId: string | number) => {
  try {
    await User.findByIdAndRemove(userId)
  } catch (error) {
    throw new Error(`${EXCEPTION.USER.REMOVE_WITH_ID}: ${userId}`)
  }
}

export { 
  findAllUser,
  findUserBy,
  checkIsExistedUser,
  createAndSaveUser,
  updateAndSaveUser,
  deleteUserById
}