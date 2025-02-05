import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import oauth2Client from "../config/youtubeConfig.js";
import { YoutubeChannel } from "../db/db.js";

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.youtubeAuth;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const youtuber = await YoutubeChannel.findOne({ youtuberId: decoded.youtuberId });
        if (!youtuber) {
            return res.status(404).json({ error: "YouTube account not linked" });
        }

        console.log(`Before refresh: ${youtuber.accessToken}`);

        oauth2Client.setCredentials({
            access_token: youtuber.accessToken,
            refresh_token: youtuber.refreshToken,
        });

        let expiryTime = 0;
        try {
            const tokenInfo = await oauth2Client.getTokenInfo(youtuber.accessToken);
            expiryTime = tokenInfo.expiry_date || 0;
            console.log(`Token Expiry Time: ${new Date(expiryTime)}`);
        } catch (err) {
            console.log("Failed to fetch token info. Assuming expired.");
        }

        const now = new Date().getTime();
        if (now >= expiryTime) {
            console.log("Access token expired. Refreshing...");

            try {
                const { credentials } = await oauth2Client.refreshAccessToken();
                youtuber.accessToken = credentials.access_token;
                await youtuber.save();
                console.log(`New access token: ${youtuber.accessToken}`);
            } catch (refreshError) {
                console.error("Failed to refresh access token:", refreshError);
                return res.status(401).json({ error: "Failed to refresh access token" });
            }
        } else {
            console.log("Access token is still valid.");
        }

        req.user = youtuber;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
};

export default authMiddleware;
