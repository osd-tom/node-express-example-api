import { Response } from "express"

export const sendResponse = (response: Response, statusCode: number, message: string, data: object) => {
  response.status(statusCode || 200).json({
    code: statusCode || 200,
    message: message || "success",
    data: data || {},
  })
}
