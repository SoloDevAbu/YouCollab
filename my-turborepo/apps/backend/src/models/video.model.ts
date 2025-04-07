import mongoose, { Schema } from 'mongoose';
import { IVideo } from './interfaces';

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  editor: { type: Schema.Types.ObjectId, ref: 'Editor', required: true },
  youtuber: { type: Schema.Types.ObjectId, ref: 'Youtuber', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String
}, {
  timestamps: true
});

export default mongoose.model<IVideo>('Video', videoSchema);
