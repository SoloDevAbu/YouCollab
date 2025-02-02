import { connect, model } from 'mongoose';
import youtuberSchema from './models/youtuber.model.js'
import editorSchema from './models/editor.model.js';
import videoSchema from './models/video.model.js';
import dotenv from 'dotenv';
import youtubeChannelSchema from './models/youtubeChannel.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
}

connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

const Editor = model('Editor', editorSchema);
const Youtuber = model('Youtuber', youtuberSchema);
const Video = model('Video', videoSchema);
const YoutubeChannel = model('Channel', youtubeChannelSchema);

export {
    Editor,
    Youtuber,
    Video,
    YoutubeChannel,
}