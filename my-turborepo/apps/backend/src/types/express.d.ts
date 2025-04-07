import { IEditor, IYoutuber } from '../models/interfaces';

declare global {
  namespace Express {
    interface Request {
      youtuber?: IYoutuber;
      editor?: IEditor;
      tokens?: {
        access_token: string;
        refresh_token: string;
      };
    }
  }
}

export {};
