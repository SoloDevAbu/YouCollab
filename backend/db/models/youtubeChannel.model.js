import { Schema } from 'mongoose'

const youtubeChannelSchema = new Schema({
    youtuberId: {
        type: Schema.Types.ObjectId,
        ref: 'Youtuber',
        required: true
    },
    channelName: {
        type: String,
        required: true,
        unique: true
    },
    channelUserName: {
        type: String,
        required: true,
    },
    subscriberCount: {
        type: Number,
        required: true,
    },
    videoCount: {
        type: Number,
        required: true,
    },
    bannerUrl: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    tokenExpiry: {
        type: Date,
        required: true,
    },
}, { timestamps: true })

export default youtubeChannelSchema;