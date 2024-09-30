import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// This should be securely stored in an environment variable
const secretKey = process.env.JWT_SECRET as string;

interface CustomJwtPayload extends JwtPayload {
  id: string;
  username: string;
}

// Middleware to authenticate JWT Token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (token == null) {
    res.sendStatus(401); // Return without sending Response object directly
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.sendStatus(403); // Return without sending Response object directly
      return;
    }

    const user = decoded as CustomJwtPayload; // Type assertion to CustomJwtPayload
    req.user = user; // Attach the user information to req.user

    next(); // Proceed to the next middleware or route handler
  });
};
