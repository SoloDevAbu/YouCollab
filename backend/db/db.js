const mongoose = require('mongoose');
const youtuberSchema = require('./models/youtuber.model');
const editorSchema = require('./models/editor.model');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const Editor = mongoose.model('Editor', editorSchema);
const Youtuber = mongoose.model('Youtuber', youtuberSchema);

module.exports = {
    Editor,
    Youtuber
}