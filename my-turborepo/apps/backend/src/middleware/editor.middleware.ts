import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { EditorRequest } from '../types';

export const editorMiddleware = async (
  req: EditorRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.editor = decoded as any;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
