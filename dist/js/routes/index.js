"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.todoRoutes = void 0;
const todo_1 = __importDefault(require("./todo/todo"));
exports.todoRoutes = todo_1.default;
const user_1 = __importDefault(require("./user/user"));
exports.userRoutes = user_1.default;
