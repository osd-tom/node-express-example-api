"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Token variables
 */
const ALOGRITHM = 'RS256';
const PRIVATE_KEY_PATH = './../../../private.key';
/**
 * Generate token
 *
 * @param payload
 * @returns
 */
const generateToken = (payload) => {
    const privateKey = fs.readFileSync(path.join(__dirname, PRIVATE_KEY_PATH));
    const signInOptions = {
        algorithm: ALOGRITHM
    };
    return jwt.sign(payload, { key: privateKey, passphrase: process.env.JWT_PASSPHRASE }, signInOptions);
};
exports.generateToken = generateToken;
