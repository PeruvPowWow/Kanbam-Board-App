"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../../middleware/auth.js"); // Import the authentication middleware
const ticket_controller_js_1 = require("../../controllers/ticket-controller.js");
const router = express_1.default.Router();
// Apply authentication middleware to all routes
router.use(auth_js_1.authenticateToken);
// GET /tickets - Get all tickets
router.get('/', ticket_controller_js_1.getAllTickets);
// GET /tickets/:id - Get a ticket by id
router.get('/:id', ticket_controller_js_1.getTicketById);
// POST /tickets - Create a new ticket
router.post('/', ticket_controller_js_1.createTicket);
// PUT /tickets/:id - Update a ticket by id
router.put('/:id', ticket_controller_js_1.updateTicket);
// DELETE /tickets/:id - Delete a ticket by id
router.delete('/:id', ticket_controller_js_1.deleteTicket);
exports.default = router; // Export router as default
