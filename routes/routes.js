const express = require('express');
const router = express.Router();

const users = require('../models/users');

router.get('/getAllUsers', async (req, res) => {
    try {
        const allUsers = await users.find();
        res.json(allUsers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/addUser', (req, res) => {
    const user = new users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        role: req.body.role
    })
    user.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        })
})

module.exports = router 