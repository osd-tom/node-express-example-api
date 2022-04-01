"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const app = (0, express_1.default)();
const validateUser = () => {
    (0, express_validator_1.check)('name')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .isLength({ max: 100 })
        .withMessage('must be at less than 100 chars long');
};
exports.validateUser = validateUser;
