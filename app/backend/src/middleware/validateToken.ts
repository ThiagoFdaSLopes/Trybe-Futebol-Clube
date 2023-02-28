import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwtToken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = decodeToken(authorization);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
