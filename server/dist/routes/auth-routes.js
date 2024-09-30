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
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create a router instance
const router = (0, express_1.Router)();
// Login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructure the username and password from the request body
    const { username, password } = req.body;
    try {
        // Find the user in the database
        const user = yield user_js_1.User.findOne({
            where: { username },
        });
        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Compare plain text password provided by user with hashed password in database
        const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Retrieve the secret key
        const secretKey = process.env.JWT_SECRET_KEY || '';
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ username }, secretKey, { expiresIn: '1h' });
        // Send the token to the client
        return res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// POST /login - Login a user
router.post('/login', login);
exports.default = router;
