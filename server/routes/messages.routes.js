const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");

const messagesController = require('../controllers/MessagesController');
// ------------------ Multer ------------------ //
// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "files/"); // Specify the desired destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
});

// Configure multer for handling file uploads
const upload = multer({ storage: storage });


// ------------------ Messages ------------------ //

// endpoint send messages
router.post('/create-messages', upload.single('image'), messagesController.send_messages);
//endpoint to fetch the messages between two users in the chatRoom
router.get('/:sendId/:receiveId', messagesController.get_chat_messages);
//endpoint to delete messages
router.delete('/delete-messages', messagesController.delete_messages);

module.exports = router;