var mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    content: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const comments = mongoose.model('comments', commentSchema);
module.exports = comments;