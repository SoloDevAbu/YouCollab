import { Response } from 'express';
import { google } from 'googleapis';
import { AuthenticatedRequest } from '../types';

const youtube = google.youtube('v3');

export const getChannelInfo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({
      access_token: req.tokens?.access_token
    });

    const response = await youtube.channels.list({
      auth,
      part: ['snippet', 'statistics'],
      mine: true
    });

    return res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching channel info'
    });
  }
};

// ... Add other YouTube controller methods
