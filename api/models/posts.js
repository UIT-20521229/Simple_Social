var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            content: String,
            createdAt: Date.now,
            ref: 'users'
        }
    ],
    userPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    share: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const posts = mongoose.model('posts', postSchema);
module.exports = posts;