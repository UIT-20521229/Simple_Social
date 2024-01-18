const posts = require('../models/posts');
const mongoose = require('mongoose');
class PostsController {
    // create posts
    async create_posts(req, res) {
        const { userPost, content } = req.body;
        let image = '';
        if (req.file !== undefined) {
            image = req.file.path;
        }

        const newPost = new posts({ userPost, content, image });
        newPost.save()
            .then(() => {
                res.status(200).json({ message: "Post added!!!" })
            })
            .catch(err => {
                res.status(500).json({ message: "Post fail!!!" })
            });
    }
    // get posts
    async get_posts(req, res) {
        try {
            const allPosts = await posts.find()
                .populate("userPost", "name avatar")
                .select("-__v")
                .sort({ createdAt: 'desc' })
                .limit(10)
                .lean()

            res.send(allPosts);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // like posts
    async like_post(req, res) {
        try {
            const { postId, userLike } = req.body;
            const post = await posts.findById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            if (post.likes.includes(userLike)) {
                post.likes.pull(userLike);
                await post.save();
                return res.json({ message: "Post unliked successfully" });
            }
            post.likes.push(userLike)
            await post.save();
            res.status(200).json({ message: "Post liked successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // comment posts
    async comment_post(req, res) {
        try {
            const { postId, userComment, content } = req.body;
            var newComment = { content, userComment };
            const post = await posts.findById(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            post.comments.push(newComment);
            await post.save();
            res.status(200).json({ message: "Comment added successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // get comment posts
    async get_comment(req, res) {
        try {
            const { postId } = req.params;
            const post = await posts.findById(postId)
                .populate({
                    path: 'comments.userComment',
                    select: 'name avatar'
                }).lean()
            const comments = post.comments.map(comment => {
                return {
                    ...comment,
                    userComment: comment.userComment,
                };
            });
            res.status(200).json(comments);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new PostsController();