'use strict';

var express = require('express');
var router = express.Router();

var userServices = require('../services/userServices');

router.post('/login', login);

function login(req, res) {
    console.log('logging in');
    console.log(req.body);
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    userServices.authenticate(email, password).then(function (data) {
        if (!data || !data.length) {
            return res.status(500).json({ error: true, message: 'User not found.' });
        }
        res.status(200).json({ error: false, user: data[0] });
    }).catch(function (e) {
        console.error(e);
    });
}

module.exports = router;