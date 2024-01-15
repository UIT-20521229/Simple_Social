const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');

const users = require('../models/users');
const messages = require('../models/messages');
const posts = require('../models/posts');

router.post("/friend-request", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;

    try {
        await users.findByIdAndUpdate(selectedUserId, {
            friendRequest: currentUserId,
        });

        await users.findByIdAndUpdate(currentUserId, {
            sendFriendRequest: selectedUserId,
        });

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/friend-request/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        //fetch the user document based on the User id
        const user = await users.findById(userId)
            .populate("friendRequest", "name email image")
            .lean();

        const friendRequest = user.friendRequest;
        res.json(friendRequest);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/friend-request/accept", async (req, res) => {
    try {
        const { sendId, receiveId } = req.body;

        //retrieve the documents of sender and the recipient
        const sender = await users.findById(sendId);
        const recepient = await users.findById(receiveId);

        sender.friends.push(receiveId);
        recepient.friends.push(sendId);

        recepient.friendRequest = recepient.friendRequest.filter(
            (request) => request.toString() !== sendId.toString()
        );

        sender.sendFriendRequest = sender.sendFriendRequest.filter(
            (request) => request.toString() !== receiveId.toString
        );

        await sender.save();
        await recepient.save();

        res.status(200).json({ message: "Friend Request accepted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/friends/:userId", async (req, res) => {
    const user = req.params.userId;
    users.findById(user)
        .then(user => {
            res.status(200).json(user.friends);
        })
        .catch(err => {
            console.log("Error retrieving user friends", err);
            res.status(500).json({ message: "Server error!!!" })
        });
})

router.get("/accepted-friends/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await users.findById(userId).populate(
            "friends",
            "name email image"
        ).lean()
        const acceptedFriends = user.friends;
        res.json(acceptedFriends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const multer = require("multer");

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

//endpoint to post Messages and store it in the backend
router.post("/messages", upload.single('image'), async (req, res) => {
    const { text, user, receiveId } = req.body;
    let image = '';
    if (req.file !== undefined) {
        image = req.file.path;
    }
    const newMessage = new messages({
        text,
        user,
        image: image,
        createdAt: new Date(),
        receiveId,
    });

    newMessage.save()
        .then(() => {
            res.status(200).json({ message: "Message added!!!" })
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).json({ message: "Message fail!!!" })
        });
});

///endpoint to get the userDetails to design the chat Room header
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        //fetch the user data from the user ID
        const receiveId = await users.findById(userId);

        res.json(receiveId);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//endpoint to fetch the messages between two users in the chatRoom
router.get("/messages/:sendId/:receiveId", async (req, res) => {
    try {
        const { sendId, receiveId } = req.params;

        const message = await messages.find({
            $or: [
                { user: sendId, receiveId: receiveId },
                { user: receiveId, receiveId: sendId },
            ],
        }).populate("user", "name email image")
            .select("-__v")
            .sort({ createdAt: 'desc' })
            .lean();

        res.send(message)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//endpoint to delete the messages!
router.post("/deleteMessages", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: "invalid req body!" });
        }

        await messages.deleteMany({ _id: { $in: messages } });

        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server" });
    }
});

router.post('/posts', upload.single('image'), async (req, res) => {
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
})

router.get('/getPosts', async (req, res) => {
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
})

router.put("/like", async (req, res) => {
    try {
        const { postId, userLike } = req.body;
        const post = await posts.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.likes.includes(userLike)) {
            post.likes.pull(userLike);
            await post.save();
            return res.status(400).json({ message: "Post unliked" });
        }
        post.likes.push(userLike)
        await post.save();
        res.status(200).json({ message: "Post liked successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/comment", async (req, res) => {
    try {
        const { postId, userComment, content } = req.body;
        const post = await posts.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        post.comments.push({ userComment, content });
        await post.save();
        res.status(200).json({ message: "Comment added successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

