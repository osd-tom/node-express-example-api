"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (response, statusCode, message, data) => {
    response.status(statusCode || 200).json({
        code: statusCode || 200,
        message: message || "success",
        data: data || {},
    });
};
exports.sendResponse = sendResponse;
