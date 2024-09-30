"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth-routes")); // This should work if auth-routes has a default export
const index_1 = __importDefault(require("./api/index"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Use authentication routes
router.use('/auth', auth_routes_1.default);
// Apply authentication middleware for API routes
router.use('/api', auth_1.authenticateToken, index_1.default);
exports.default = router;
