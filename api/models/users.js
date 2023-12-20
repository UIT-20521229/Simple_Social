var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    avatar: {
        type: Buffer,
    },
    friendRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    sendFriendRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
})

const users = mongoose.model('users', UserSchema);
module.exports = users;