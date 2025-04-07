import mongoose, { Schema } from 'mongoose';
import { IEditor } from './interfaces';

const editorSchema = new Schema<IEditor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationOtp: String,
  resetPasswordOtp: String
}, {
  timestamps: true
});

export default mongoose.model<IEditor>('Editor', editorSchema);
