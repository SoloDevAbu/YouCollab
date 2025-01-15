const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const youtuberMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ 
            success: false,
            message: 'Not Authorized, Login again'
        });
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET);

        req.youtuber = {
            youtuberId: decode.youtuberId
        }

        next();
    } catch (error) {
        return res.status(401).json({
          message: 'Invalid or expired token.',
          error: error.message,
        });
      }
}

module.exports = youtuberMiddleware;