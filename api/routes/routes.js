const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('../models/users');
const messages = require('../models/messages');

router.get('/getAllUsers', (req, res) => {
    try {
        const allUsers = users.find();
        res.json(allUsers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/register', (req, res) => {
    const { name, email, password, avatar } = req.body;
    const newUser = new users({ name, email, password, avatar });
    newUser.save()
        .then(() => {
            res.status(200).json({ message: "User added!!!" })
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).json({ message: "Register fail!!!" })
        });
})

const createToken = (userId) => {
    const payload = { userId };
    const token = jwt.sign(payload, "mysecretkey", { expiresIn: '24h' });
    return token;
}

router.post('/login', (req, res) => {
    const count = 0;
    console.log("go login", () => { count++ })
    const { email, password } = req.body;
    //check if email and password entered
    if (!email || !password) {
        return res.status(404).json({ message: "Please enter all fields" });
    }
    //check if user exists
    users.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (password !== user.password) {
                return res.status(404).json({ message: "Password incorrect" });
            }
            const token = createToken(user._id);
            res.status(200).json({ token });
        })
        .catch(err => {
            console.log("Can't find user! Please register!!!", err);
            res.status(500).json({ message: "Server error!!!" })
        });
})

router.get('/users/:userId', (req, res) => {
    const loginUserId = req.params.userId;
    users.find({ _id: { $ne: loginUserId } })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log("Error retrieving user", err);
            res.status(500).json({ message: "Server error!!!" })
        });
})

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
            .populate("friend request:", "name email image")
            .lean();

        const friendRequest = users.friendRequest;

        res.json(friendRequest);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/accepted-friends/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await users.findById(userId).populate(
            "friends",
            "name email image"
        );
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
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

//endpoint to post Messages and store it in the backend
router.post("/messages", upload.single("imageFile"), async (req, res) => {
    try {
        const { sendId, receiveId, messageType, messageText } = req.body;

        const newMessage = new messages({
            sendId,
            receiveId,
            messageType,
            message: messageText,
            timestamp: new Date(),
            imageUrl: messageType === "image" ? req.file.path : null,
        });

        await newMessage.save();
        res.status(200).json({ message: "Message sent Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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

        const messages = await messages.find({
            $or: [
                { sendId: sendId, receiveId: receiveId },
                { sendId: receiveId, receiveId: sendId },
            ],
        }).populate("sendId", "_id name");

        res.json(messages);
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

module.exports = router 