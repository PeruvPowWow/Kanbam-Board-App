"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../../middleware/auth.js"); // Import the authentication middleware
const user_controller_js_1 = require("../../controllers/user-controller.js");
const router = express_1.default.Router();
// Apply authentication middleware to all routes
router.use(auth_js_1.authenticateToken);
// GET /users - Get all users
router.get('/', user_controller_js_1.getAllUsers);
// GET /users/:id - Get a user by id
router.get('/:id', user_controller_js_1.getUserById);
// POST /users - Create a new user
router.post('/', user_controller_js_1.createUser);
// PUT /users/:id - Update a user by id
router.put('/:id', user_controller_js_1.updateUser);
// DELETE /users/:id - Delete a user by id
router.delete('/:id', user_controller_js_1.deleteUser);
exports.default = router; // Export router as default
