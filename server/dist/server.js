"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index")); // This is fine as it is
const index_js_1 = require("./models/index.js"); // Adjust if needed
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false; // Set to true only during development
// Serves static files from the client's dist folder
app.use(express_1.default.static('../client/dist'));
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Set up routes
app.use(index_1.default);
// Sync database and start the server
index_js_1.sequelize.sync({ force: forceDatabaseRefresh })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})
    .catch((err) => {
    if (err instanceof Error) {
        console.error('Unable to connect to the database:', err.message);
    }
    else {
        console.error('Unable to connect to the database:', err);
    }
});
