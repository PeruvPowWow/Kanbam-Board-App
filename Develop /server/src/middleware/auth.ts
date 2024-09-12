import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  username: string;
}

// Middleware to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']; // Authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  // If no token is found, return unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken) => {
    if (err) {
      // If verification fails, return forbidden status
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Cast decodedToken to the custom JwtPayload type
    const payload = decodedToken as JwtPayload;

    // If the token is valid, attach user info to the request object
    req.user = { id: payload.id, username: payload.username };

    // Call next() to proceed to the next middleware/route handler
    next();
  });
};
