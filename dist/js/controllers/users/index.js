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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUserList = void 0;
const lodash_1 = __importDefault(require("lodash"));
const user_1 = __importDefault(require("../../models/user"));
const commonResponse_1 = require("../../helpers/commonResponse");
const response_1 = require("../../lang/response");
const getUserList = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield user_1.default.find();
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.LISTS.GET_SUCCESS, { userList });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.USER_MSG.LISTS.GET_FAILURE, {});
    }
});
exports.getUserList = getUserList;
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = request;
        const user = yield user_1.default.findById(id);
        if (lodash_1.default.isEmpty(user)) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.USER.USER_NOT_FOUND, {});
        }
        else {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.USER.GET_USER_SUCCESS, { user });
        }
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.USER.GET_USER_FAILURE, {});
    }
});
exports.getUser = getUser;
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const params = {
            name: body.name,
            email: body.email,
            phoneNumber: body.phoneNumber,
            dob: body.dob,
            password: body.password
        };
        const userItem = new user_1.default(params);
        const newUser = yield userItem.save();
        const userList = yield user_1.default.find();
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.USER.CREATE_SUCCESS, { newUser, userList });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.USER_MSG.USER.CREATE_FAILURE, {});
    }
});
exports.createUser = createUser;
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = request;
        const user = yield user_1.default.findById(id);
        if (lodash_1.default.isEmpty(user)) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.USER_MSG.USER.USER_NOT_FOUND, {});
        }
        else {
            yield user_1.default.findByIdAndUpdate({ _id: id }, body);
            const userList = yield user_1.default.find();
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.USER.UPDATE_SUCCESS, { userList });
        }
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.USER_MSG.USER.UPDATE_FAILURE, {});
    }
});
exports.updateUser = updateUser;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = request;
        const user = yield user_1.default.findById(id);
        if (lodash_1.default.isEmpty(user)) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.USER_MSG.USER.USER_NOT_FOUND, {});
        }
        else {
            yield user_1.default.findByIdAndRemove({ _id: id });
            const userList = yield user_1.default.find();
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.USER_MSG.USER.DELETE_SUCCESS, { userList });
        }
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.USER_MSG.USER.DELETE_FAILURE, {});
    }
});
exports.deleteUser = deleteUser;
