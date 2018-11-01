const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userServices = require('../services/userServices');

router.post('/login', login);

function login(req, res) {
    console.log('logging in');
    console.log(req.body);
    const { email, password } = req.body;
    userServices.authenticate(email, password).then(data => {
        if (!data || !data.length) {
            return res.status(500).json({error: true, message: 'User not found.'})
        }
        res.status(200).json({error: false, user: data[0]})
    }).catch(e => {
        console.error(e);
    })
}

module.exports = router;
