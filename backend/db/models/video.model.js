import { Schema } from "mongoose";

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],

    editor: {
        type: Schema.Types.ObjectId,
        ref: 'Editor'
    },
    youtuber: {
        type: Schema.Types.ObjectId,
        ref: 'Youtuber'
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    }
}, {timestamps: true})

export default videoSchema;