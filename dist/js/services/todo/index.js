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
exports.deleteTodoById = exports.updateAndSaveTodo = exports.checkIsExistedTodo = exports.createAndSaveTodo = exports.findTodoBy = exports.findAllTodo = void 0;
const lodash_1 = __importDefault(require("lodash"));
const todo_1 = __importDefault(require("../../models/todo"));
/**
 * Get todo list
 *
 * @param queryOptions
 * @returns todo list
 */
const findAllTodo = (queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (lodash_1.default.isEmpty(queryOptions)) {
            return yield todo_1.default.find();
        }
        return yield todo_1.default.find().select(queryOptions);
    }
    catch (error) {
        throw new Error(`Unable to connect to the database`);
    }
});
exports.findAllTodo = findAllTodo;
/**
 * Get specific todo
 *
 * @param queryParams
 * @param queryOptions
 * @returns todo
 */
const findTodoBy = (queryParams, queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = todo_1.default.findOne({
            $or: queryParams
        });
        if (lodash_1.default.isEmpty(queryOptions)) {
            return yield query;
        }
        return yield query.select(queryOptions);
    }
    catch (error) {
        throw new Error(`Unable to find todo with parameters: ${queryParams}`);
    }
});
exports.findTodoBy = findTodoBy;
/**
 * Create new todo
 *
 * @param parameters
 * @returns todo
 */
const createAndSaveTodo = (parameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoItem = new todo_1.default(parameters);
        const newTodo = yield todoItem.save();
        return newTodo;
    }
    catch (error) {
        throw new Error(`Unable to connect to the database`);
    }
});
exports.createAndSaveTodo = createAndSaveTodo;
/**
 * Check is existed todo
 *
 * @param todoId
 * @returns boolean
 */
const checkIsExistedTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoData = yield todo_1.default.findById(todoId);
        if (lodash_1.default.isEmpty(todoData)) {
            return false;
        }
        return true;
    }
    catch (error) {
        throw new Error(`Unable to find todo with id: ${todoId}`);
    }
});
exports.checkIsExistedTodo = checkIsExistedTodo;
/**
 * Update todo
 *
 * @param todoId
 * @param parameters
 * @returns todo
 */
const updateAndSaveTodo = (todoId, parameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todo_1.default.findByIdAndUpdate({ _id: todoId }, parameters);
        return yield findTodoBy([{ _id: todoId }], []);
    }
    catch (error) {
        throw new Error(`Unable to update todo with id: ${todoId}`);
    }
});
exports.updateAndSaveTodo = updateAndSaveTodo;
/**
 * Delete todo by id
 *
 * @param todoId
 */
const deleteTodoById = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todo_1.default.findByIdAndRemove(todoId);
    }
    catch (error) {
        throw new Error(`Unable to remove the todo with id: ${todoId}`);
    }
});
exports.deleteTodoById = deleteTodoById;
