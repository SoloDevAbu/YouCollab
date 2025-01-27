import { connect, model } from 'mongoose';
import youtuberSchema from './models/youtuber.model'
import editorSchema from './models/editor.model';
import videoSchema from './models/video.model';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

connect(MONGODB_URI);

const Editor = model('Editor', editorSchema);
const Youtuber = model('Youtuber', youtuberSchema);
const Video = model('Video', videoSchema);

export default {
    Editor,
    Youtuber,
    Video
}