import { Document } from 'mongoose';

export interface IYoutuber extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationOtp?: string;
  resetPasswordOtp?: string;
  youtubeTokens?: {
    access_token: string;
    refresh_token: string;
  };
  editors: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEditor extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationOtp?: string;
  resetPasswordOtp?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideo extends Document {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  editor: string;
  youtuber: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
