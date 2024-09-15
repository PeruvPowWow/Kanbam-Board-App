import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// Extend JwtPayload to include 'id'
interface JwtPayload {
  id: string;
  username: string;
}

export const authenticateToken: RequestHandler = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken) => {
    if (err) {
      // If token verification fails, return a 403 Forbidden response
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Cast decodedToken to JwtPayload type
    const payload = decodedToken as JwtPayload;

    // Attach the user information to the request object
    req.user = { id: payload.id, username: payload.username };

    // Move to the next middleware or route handler
    next();
  });

  // Add a return here to satisfy TypeScript
  return;
};
