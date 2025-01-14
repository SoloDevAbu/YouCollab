const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

require('dotenv').config();

const youtuberMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Access token is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];


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