const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    receiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    messageType: {
        type: String,
        enum: ["text", "image", "video", "audio", "file"]
    },
    message: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    timeStamps: {
        type: Date,
        default: Date.now
    }
})

const messages = mongoose.model('messages', messageSchema);
module.exports = messages;