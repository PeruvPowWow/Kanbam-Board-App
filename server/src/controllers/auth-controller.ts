// File: src/controllers/auth-controller.ts

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user'; // Assuming you have a User model

// Secret key for JWT (could be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (username: string, password: string): Promise<string> => {
  // Look for the user in the database
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('Invalid username or password');
  }

  // Compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  // Generate a JWT token if the credentials are valid
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};
