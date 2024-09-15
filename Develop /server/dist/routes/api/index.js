"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth-routes")); // Remove .ts extension
const ticket_routes_1 = __importDefault(require("./ticket-routes")); // Remove .ts extension
const user_routes_1 = __importDefault(require("./user-routes")); // Remove .ts extension
const auth_1 = require("../middleware/auth"); // Correct import for middleware
const router = (0, express_1.Router)();
// Public routes
router.use('/auth', auth_routes_1.default);
// Protected routes
router.use('/tickets', auth_1.authenticateToken, ticket_routes_1.default);
router.use('/users', auth_1.authenticateToken, user_routes_1.default);
exports.default = router;
