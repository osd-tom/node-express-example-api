"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../../models/user"));
const commonResponse_1 = require("../../helpers/commonResponse");
const response_1 = require("../../lang/response");
const generateToken_1 = require("../../utils/generateToken");
/**
 * Register
 *
 * @param request
 * @param response
 */
const registration = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const params = {
            name: body.name,
            email: body.email,
            phoneNumber: body.phoneNumber,
            dob: body.dob,
            password: yield bcrypt_1.default.hash(body.password, 10)
        };
        const userEmail = yield user_1.default.findOne({ email: body.email });
        if (userEmail) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, "Email has already been taken", {});
        }
        else {
            const registeringUser = new user_1.default(params);
            const user = yield registeringUser.save();
            yield user.save();
            user.password = "";
            const token = (0, generateToken_1.createToken)(user);
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.USER.CREATE_SUCCESS, { token, user });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.registration = registration;
