import { Response } from 'express';
import { google } from 'googleapis';
import { YoutuberRequest } from '../types';
import Youtuber from '../models/youtuber.model';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const googleAuth = async (
  req: YoutuberRequest, 
  res: Response
): Promise<void> => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube']
  });

  res.redirect(url);
};

export const googleAuthCallback = async (
  req: YoutuberRequest, 
  res: Response
): Promise<Response> => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code as string);

    await Youtuber.findByIdAndUpdate(req.youtuber?.id, {
      youtubeTokens: tokens
    });

    res.cookie('youtube_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.redirect(process.env.CLIENT_URL as string);
    return res.status(200).json({
      success: true,
      message: 'Google authentication successful'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in Google authentication'
    });
  }
};
