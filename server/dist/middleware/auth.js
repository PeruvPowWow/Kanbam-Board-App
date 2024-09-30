"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// This should be securely stored in an environment variable
const secretKey = process.env.JWT_SECRET;
// Middleware to authenticate JWT Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (token == null) {
        res.sendStatus(401); // Return without sending Response object directly
        return;
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.sendStatus(403); // Return without sending Response object directly
            return;
        }
        const user = decoded; // Type assertion to CustomJwtPayload
        req.user = user; // Attach the user information to req.user
        next(); // Proceed to the next middleware or route handler
    });
};
exports.authenticateToken = authenticateToken;
