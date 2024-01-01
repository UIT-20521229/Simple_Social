var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String,
    },
    like: {
        type: Number,
        default: 0
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments'
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