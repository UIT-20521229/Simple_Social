const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");

const postsController = require('../controllers/PostsController');
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
const upload = multer({ storage: storage });

// ------------------ Posts ------------------ //

// endpoint create posts
router.post('/create-posts', upload.single('image'), postsController.create_posts);
// endpoint get posts
router.get('/get-posts', postsController.get_posts);
// endpoint like posts
router.put("/active-like", postsController.like_post);
// endpoint comment posts
router.post("/create-comment", postsController.comment_post);
// endpoint get comment posts
router.get("/get-comments/:postId", postsController.get_comment);





module.exports = router;