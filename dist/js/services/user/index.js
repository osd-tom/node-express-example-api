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
exports.deleteUserById = exports.updateAndSaveUser = exports.createAndSaveUser = exports.checkIsExistedUser = exports.findUserBy = exports.findAllUser = void 0;
const lodash_1 = __importDefault(require("lodash"));
const user_1 = __importDefault(require("../../models/user"));
/**
 * Get user base on query options
 *
 * @param queryOptions
 * @returns user list | {}
 */
const findAllUser = (queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (lodash_1.default.isEmpty(queryOptions)) {
            return yield user_1.default.find();
        }
        return yield user_1.default.find().select(queryOptions);
    }
    catch (error) {
        throw new Error(`Unable to connect to the database`);
    }
});
exports.findAllUser = findAllUser;
/**
 * Query user data based on parameters
 *
 * @param queryParams
 * @param queryOptions
 * @returns user data | {}
 */
const findUserBy = (queryParams, queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = user_1.default.find({
            $or: queryParams
        });
        if (lodash_1.default.isEmpty(queryOptions)) {
            return yield query;
        }
        return yield query.select(queryOptions);
    }
    catch (error) {
        throw new Error(`Unable to find user with parameters: ${queryParams}`);
    }
});
exports.findUserBy = findUserBy;
/**
 * Check is existed user
 *
 * @param userId
 * @returns boolean
 */
const checkIsExistedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield user_1.default.findById(userId);
        if (lodash_1.default.isEmpty(userData)) {
            return false;
        }
        return true;
    }
    catch (error) {
        throw new Error(`Unable to find user with id: ${userId}`);
    }
});
exports.checkIsExistedUser = checkIsExistedUser;
/**
 * Create new user
 *
 * @param params
 * @returns User
 */
const createAndSaveUser = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userItem = new user_1.default(params);
        const newUser = yield userItem.save();
        return newUser;
    }
    catch (error) {
        throw new Error(`Unable to connect to the database`);
    }
});
exports.createAndSaveUser = createAndSaveUser;
/**
 * Update user data
 *
 * @param userId
 * @param params
 * @returns user data
 */
const updateAndSaveUser = (userId, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndUpdate({ _id: userId }, params);
        const user = yield findUserBy([{ _id: userId }], ["-password"]);
        return user;
    }
    catch (error) {
        throw new Error(`Unable to update user with id: ${userId}`);
    }
});
exports.updateAndSaveUser = updateAndSaveUser;
/**
 * Delete user by id
 *
 * @param userId
 */
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndRemove(userId);
    }
    catch (error) {
        throw new Error(`Unable to remove user with id: ${userId}`);
    }
});
exports.deleteUserById = deleteUserById;
