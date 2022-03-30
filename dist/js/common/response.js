"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const express_1 = require("express");
function sendSuccessResponse(code, msg, data) {
    express_1.response.status(code).json({
        "code": code,
        "message": msg,
        "data": data
    });
}
exports.sendSuccessResponse = sendSuccessResponse;
function sendErrorResponse(code, msg) {
    express_1.response.status(code).json({
        "code": code,
        "message": msg
    });
}
exports.sendErrorResponse = sendErrorResponse;
