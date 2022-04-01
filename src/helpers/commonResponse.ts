import { Response } from "express"

/**
 * Common response
 * 
 * @param response 
 * @param statusCode 
 * @param message 
 * @param data 
 * @returns any
 */
export const sendResponse = (response: Response, statusCode: number, message: string, data: object) => {
  return response.status(statusCode || 200).json({
    code: statusCode || 200,
    message: message || "success",
    data: data || {},
  })
}
