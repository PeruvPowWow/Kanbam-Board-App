import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express-serve-static-core';

// Define an interface for the request body
interface LoginRequestBody {
  username: string;
  password: string;
}

// Create a router instance
const router = Router();

// Login function
const login: RequestHandler<{}, {}, LoginRequestBody> = async (req: Request, res: Response): Promise<void> => {
  // Destructure the username and password from the request body
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({
      where: { username },
    });

    // Check if the user exists
    if (!user) {
      res.status(401).json({ message: 'Authentication failed' });
      return; // Ensure we return to exit the function
    }

    // Compare plain text password provided by user with hashed password in database
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: 'Authentication failed' });
      return; // Ensure we return to exit the function
    }

    // Retrieve the secret key
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Generate a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /login - Login a user
router.post('/login', login);

export default router;
