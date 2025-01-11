const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpiredAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpiredAt: {
        type: Number,
        default: 0
    },
    youtuber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Youtuber'
    },
    profileImage: {
        type: String
    },
})

module.exports = editorSchema;