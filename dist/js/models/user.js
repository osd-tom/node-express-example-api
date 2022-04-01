"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("User", userSchema);
