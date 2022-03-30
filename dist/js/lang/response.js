"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE = exports.USER_MSG = exports.TODO_MSG = void 0;
exports.TODO_MSG = {
    LISTS: {
        GET_SUCCESS: "Todo list have retrieved successfully",
        GET_FAILURE: "Could not retrieve the requested data"
    },
    TODO: {
        CREATE_SUCCESS: "New todo item has been added successfully",
        CREATE_FAILURE: "Could not create new item",
        UPDATE_SUCCESS: "The todo item has been updated successfully",
        UPDATE_FAILURE: "Could not update the item",
        DELETE_SUCCESS: "The todo item has been deleted successfully",
        DELETE_FAILURE: "Could not delete the item",
        ITEM_NOT_FOUND: "Item not found",
        GET_TODO_SUCCESS: "Todo has retrieved successfully",
        GET_TODO_FAILURE: "Could not get todo data"
    }
};
exports.USER_MSG = {
    LISTS: {
        GET_SUCCESS: "User list have retrieved successfully",
        GET_FAILURE: "Could not retrieve the requested data"
    },
    USER: {
        CREATE_SUCCESS: "New user has been added successfully",
        CREATE_FAILURE: "Could not create new user",
        UPDATE_SUCCESS: "A user has been updated successfully",
        UPDATE_FAILURE: "Could not update the user",
        DELETE_SUCCESS: "The user has been deleted successfully",
        DELETE_FAILURE: "Could not delete the user",
        USER_NOT_FOUND: "User not found",
        GET_USER_SUCCESS: "User has retrieved successfully",
        GET_USER_FAILURE: "Could not get user data"
    }
};
exports.CODE = {
    SUCCESS: 200,
    FAILURE: 404
};
