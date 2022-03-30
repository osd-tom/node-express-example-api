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
const getTodoList = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoList = yield todo_1.default.find();
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.LISTS.GET_SUCCESS, { todoList });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.LISTS.GET_FAILURE, {});
    }
});
exports.getTodoList = getTodoList;
const getTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = request;
        const todo = yield todo_1.default.findById(id);
        if (lodash_1.default.isEmpty(todo)) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.ITEM_NOT_FOUND, {});
        }
        else {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.GET_TODO_SUCCESS, { todo });
        }
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.GET_TODO_FAILURE, {});
    }
});
exports.getTodo = getTodo;
const createTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const params = {
            name: body.name,
            description: body.description,
            status: body.status
        };
        const todoItem = new todo_1.default(params);
        const newTodo = yield todoItem.save();
        const todoList = yield todo_1.default.find();
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.CREATE_SUCCESS, { newTodo, todoList });
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.CREATE_FAILURE, {});
    }
});
exports.createTodo = createTodo;
const updateTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = request;
        const todo = yield todo_1.default.findById(id);
        if (lodash_1.default.isEmpty(todo)) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.ITEM_NOT_FOUND, {});
        }
        else {
            yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
            const todoList = yield todo_1.default.find();
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.UPDATE_SUCCESS, { todoList });
        }
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.UPDATE_FAILURE, {});
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = request;
        const todo = yield todo_1.default.findById(id);
        if (lodash_1.default.isEmpty(todo)) {
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.ITEM_NOT_FOUND, {});
        }
        else {
            yield todo_1.default.findByIdAndRemove(id);
            const todoList = yield todo_1.default.find();
            (0, commonResponse_1.sendResponse)(response, response_1.CODE.SUCCESS, response_1.TODO_MSG.TODO.DELETE_SUCCESS, { todoList });
        }
    }
    catch (error) {
        (0, commonResponse_1.sendResponse)(response, response_1.CODE.FAILURE, response_1.TODO_MSG.TODO.DELETE_FAILURE, {});
    }
});
exports.deleteTodo = deleteTodo;
