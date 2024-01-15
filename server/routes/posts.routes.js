const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");

const postsController = require('../controllers/PostsController');

// ------------------ Posts ------------------ //

// endpoint create posts
router.post('/posts', upload.single('image'), postsController.create_posts);
// endpoint get posts
router.get('/posts', postsController.get_posts);
// endpoint like posts
router.put("/like", postsController.like_post);
// endpoint comment posts
router.post("/comment", postsController.comment_post);



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

module.exports = router;