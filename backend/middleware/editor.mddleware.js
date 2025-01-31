import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const editorMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ 
            success: false,
            message: 'Not Authorized, Login again'
        });
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET);

        req.editor = {
            editorId: decode.editorId
        }

        next();
    } catch (error) {
        return res.status(401).json({
          message: 'Invalid or expired token.',
          error: error.message,
        });
      }
}