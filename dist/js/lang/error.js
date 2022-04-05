"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCEPTION = void 0;
exports.EXCEPTION = {
    SYSTEM: {
        DB_CONNECTION: "Unable to connect to the database"
    },
    USER: {
        FIND_WITH_PARAMS: "Unable to find user with the parameters",
        FIND_WITH_ID: "Unable to find user with id",
        UPDATE_WITH_ID: "Unable to update user with id",
        REMOVE_WITH_ID: "Unable to remove user with id"
    },
    TODO: {
        FIND_WITH_PARAMS: "Unable to find todo with the parameters",
        FIND_WITH_ID: "Unable to find todo with id",
        UPDATE_WITH_ID: "Unable to update todo with id",
        REMOVE_WITH_ID: "Unable to remove todo with id"
    }
};
