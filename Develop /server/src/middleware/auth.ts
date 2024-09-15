import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken: RequestHandler = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' }); // Return here to stop execution on error
    }

    // Cast decodedToken to the correct payload type
    const payload = decodedToken as { id: string; username: string };
    // Attach the user information to the request object
    req.user = { id: payload.id, username: payload.username };

    // Call next() to proceed to the next middleware or route handler
    return next(); // Explicit return here ensures that we return a value in every code path
  });

  // Add a return here to satisfy TypeScript
  return;
};

