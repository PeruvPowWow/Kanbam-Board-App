import { Router, Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// POST /login - Login a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // 1. Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Verify the password using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // 3. Generate a JWT token with the user's ID and username as payload
    const secretKey = process.env.JWT_SECRET as string || ''; // Ensure it's set in .env
    if (!secretKey) {
      return res.status(500).json({ message: 'JWT secret key not configured' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,  // Sign the JWT using the secret
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    // 4. Return the token as a response
    return res.json({ token });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

router.post('/login', login);

export default router;
