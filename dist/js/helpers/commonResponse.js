"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
/**
 * Common response
 *
 * @param response
 * @param statusCode
 * @param message
 * @param data
 * @returns any
 */
const sendResponse = (response, statusCode, message, data) => {
    return response.status(statusCode || 200).json({
        code: statusCode || 200,
        message: message || "success",
        data: data || {},
    });
};
exports.sendResponse = sendResponse;
