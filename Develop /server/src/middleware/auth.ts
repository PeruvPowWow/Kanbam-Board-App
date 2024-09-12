import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id: string;  // Add any other relevant fields, like user ID
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the Authorization header from the request
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  // If no token is provided, return 401 Unauthorized
  if (token == null) return res.status(401).json({ message: 'Token not provided' });

  // Verify the token using the JWT secret key
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    // If the token is valid, attach the user data (decodedToken) to the request object
    const payload = decodedToken as JwtPayload;
    req.user = {
      id: payload.id,
      username: payload.username,
    };

    // Proceed to the next middleware or route handler
    next();
  });
};
