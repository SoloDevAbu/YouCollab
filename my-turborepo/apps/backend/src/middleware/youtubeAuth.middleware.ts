import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const tokens = req.cookies.youtube_tokens;

    if (!tokens) {
      return res.status(401).json({
        success: false,
        message: 'YouTube authentication required'
      });
    }

    req.tokens = JSON.parse(tokens);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid YouTube authentication'
    });
  }
};
