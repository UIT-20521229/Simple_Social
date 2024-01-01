const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    receiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
})

const messages = mongoose.model('messages', messageSchema);
module.exports = messages;