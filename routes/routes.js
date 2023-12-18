const express = require('express');
const router = express.Router();

const users = require('../models/users');

router.get('/getAllUsers', async (req, res) => {
    try { 
        const allUsers = await users.find();
        res.json(allUsers);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router 