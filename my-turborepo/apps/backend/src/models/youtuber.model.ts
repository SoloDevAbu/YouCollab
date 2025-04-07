import mongoose, { Schema } from 'mongoose';
import { IYoutuber } from './interfaces';

const youtuberSchema = new Schema<IYoutuber>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationOtp: String,
  resetPasswordOtp: String,
  youtubeTokens: {
    access_token: String,
    refresh_token: String
  },
  editors: [{ type: Schema.Types.ObjectId, ref: 'Editor' }]
}, {
  timestamps: true
});

export default mongoose.model<IYoutuber>('Youtuber', youtuberSchema);
