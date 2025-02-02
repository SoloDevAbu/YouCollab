import { Schema } from 'mongoose';

const editorSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Youtuber'
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    profileImage: {
        type: String
    },
}, {timestamps: true})

export default editorSchema;