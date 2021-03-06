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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = exports.getTodoList = void 0;
const lodash_1 = __importDefault(require("lodash"));
const todo_1 = __importDefault(require("../../models/todo"));
const commonResponse_1 = require("../../helpers/commonResponse");
const response_1 = require("../../lang/response");
const todo_2 = require("../../services/todo");
/**
 * Get todo list
 *
 * @param request
 * @param response
 */
const getTodoList = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoList = yield (0, todo_2.findAllTodo)([]);
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.LISTS.GET_SUCCESS, { todoList });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.LISTS.GET_FAILURE, {});
    }
});
exports.getTodoList = getTodoList;
/**
 * Get specific todo item
 *
 * @param request
 * @param response
 */
const getTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = request;
        const todo = yield (0, todo_2.findTodoBy)([{ _id: id }], []);
        if (lodash_1.default.isEmpty(todo)) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.ITEM_NOT_FOUND, {});
        }
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.GET_TODO_SUCCESS, { todo });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.GET_TODO_FAILURE, {});
    }
});
exports.getTodo = getTodo;
/**
 * Create todo
 *
 * @param request
 * @param response
 */
const createTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const params = {
            name: body.name,
            description: body.description,
            status: body.status
        };
        const newTodo = yield (0, todo_2.createAndSaveTodo)(params);
        const todoList = yield todo_1.default.find();
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.CREATE_SUCCESS, { newTodo, todoList });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.CREATE_FAILURE, {});
    }
});
exports.createTodo = createTodo;
/**
 * Update todo
 *
 * @param request
 * @param response
 */
const updateTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = request;
        if (!(yield (0, todo_2.checkIsExistedTodo)(id))) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.ITEM_NOT_FOUND, {});
        }
        const todo = yield (0, todo_2.updateAndSaveTodo)(id, body);
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.UPDATE_SUCCESS, { todo });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.UPDATE_FAILURE, {});
    }
});
exports.updateTodo = updateTodo;
/**
 * Delete todo
 *
 * @param request
 * @param response
 */
const deleteTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = request;
        if (!(yield (0, todo_2.checkIsExistedTodo)(id))) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.ITEM_NOT_FOUND, {});
        }
        yield (0, todo_2.deleteTodoById)(id);
        const todoList = yield todo_1.default.find();
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.DELETE_SUCCESS, { todoList });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.DELETE_FAILURE, {});
    }
});
exports.deleteTodo = deleteTodo;
