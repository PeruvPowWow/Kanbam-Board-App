"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_js_1 = __importDefault(require("./auth-routes.js"));
const ticket_routes_js_1 = __importDefault(require("./api/ticket-routes.js")); // Import ticket routes
const user_routes_js_1 = __importDefault(require("./api/user-routes.js")); // Import user routes
const auth_js_1 = require("../middleware/auth.js"); // Import the middleware
const router = (0, express_1.Router)();
// Public routes
router.use('/auth', auth_routes_js_1.default);
// Protected routes
router.use('/tickets', auth_js_1.authenticateToken, ticket_routes_js_1.default);
router.use('/users', auth_js_1.authenticateToken, user_routes_js_1.default);
exports.default = router;
