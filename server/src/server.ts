import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index'; // This is fine as it is
import { sequelize } from './models/index.js'; // Adjust if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false; // Set to true only during development

// Serves static files from the client's dist folder
app.use(express.static('../client/dist'));

// Middleware to parse JSON requests
app.use(express.json());

// Set up routes
app.use(routes);

// Sync database and start the server
sequelize.sync({ force: forceDatabaseRefresh })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err: unknown) => {
        if (err instanceof Error) {
            console.error('Unable to connect to the database:', err.message);
        } else {
            console.error('Unable to connect to the database:', err);
        }
    });
