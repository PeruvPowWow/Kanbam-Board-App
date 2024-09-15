"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
// POST /login - Login a user
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // 1. Check if the user exists
        const user = await user_1.User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // 2. Verify the password using bcrypt
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // 3. Generate a JWT token with the user's ID and username as payload
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, // Ensure JWT secret is in .env
        { expiresIn: '1h' } // Token expires in 1 hour
        );
        // 4. Return the token as a response
        return res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
router.post('/login', exports.login);
exports.default = router;
