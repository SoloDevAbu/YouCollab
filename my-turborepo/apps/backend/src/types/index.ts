import { Request } from 'express';

export interface YoutuberRequest extends Request {
  youtuber?: {
    id: string;
    email: string;
    // add other youtuber properties
  };
}

export interface EditorRequest extends Request {
  editor?: {
    id: string;
    email: string;
    // add other editor properties
  };
}

export interface AuthenticatedRequest extends Request {
  user?: any;
  tokens?: {
    access_token: string;
    refresh_token: string;
  };
}
