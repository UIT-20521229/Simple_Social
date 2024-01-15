const users = require('../models/users');
const jwt = require('jsonwebtoken');
const path = require('path');

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
    async friend_request(req, res) {
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
}

const createToken = (userId) => {
    const payload = { userId };
    const token = jwt.sign(payload, "mysecretkey", { expiresIn: '24h' });
    return token;
}

module.exports = new UsersController();