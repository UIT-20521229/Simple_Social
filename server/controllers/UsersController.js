const users = require('../models/users');
const jwt = require('jsonwebtoken');

class UsersController {
    //register function
    register(req, res) {
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
    }
    //login function
    login(req, res) {
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
    }
    //get all users
    getUser(req, res) {
        const loginUserId = req.params.userId;
        users.find({ _id: { $ne: loginUserId } })
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                console.log("Error retrieving user", err);
                res.status(500).json({ message: "Server error!!!" })
            });
    }
    //send friend request
    async send_friend_request(req, res) {
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
    }
    //get friend request
    async get_friend_request(req, res) {
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
    }
    //accept friend request
    async accept_friend_request(req, res) {
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
    }
    //get friends by ID
    async find_friends(req, res) {
        const user = req.params.userId;
        users.findById(user)
            .then(user => {
                res.status(200).json(user.friends);
            })
            .catch(err => {
                console.log("Error retrieving user friends", err);
                res.status(500).json({ message: "Server error!!!" })
            });
    }
    //get accepted friends
    async accepted_friend_list(req, res) {
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
    }
}

const createToken = (userId) => {
    const payload = { userId };
    const token = jwt.sign(payload, "mysecretkey", { expiresIn: '24h' });
    return token;
}

module.exports = new UsersController();