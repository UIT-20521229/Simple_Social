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
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
    },
})

module.exports = mongoose.model('users', UserSchema);