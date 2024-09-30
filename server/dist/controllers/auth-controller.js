"use strict";
// File: src/controllers/auth-controller.ts
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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user"); // Assuming you have a User model
// Secret key for JWT (could be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Look for the user in the database
    const user = yield user_1.User.findOne({ where: { username } });
    if (!user) {
        throw new Error('Invalid username or password');
    }
    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }
    // Generate a JWT token if the credentials are valid
    const token = jsonwebtoken_1.default.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return token;
});
exports.login = login;
