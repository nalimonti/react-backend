'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var userServices = require('../services/userServices');
var authServices = require('../services/authServices');

router.post('/login', login);
router.post('/', createUser);

function login(req, res) {
    console.log('logging in');
    console.log(req.body);
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    userServices.findByEmail(email).then(function (data) {
        // if (!data || !data.length) {
        //     return res.status(500).json({error: true, message: 'User not found.'})
        // }
        // const user = data[0];
        // const token = authServices.generateToken(user);
        // res.status(200).json({error: false, user, token })
        console.log(data);
        var hash = data[0].password;

        bcrypt.compare(password, hash, function (err, valid) {
            console.log(err);
            console.log(valid);
            if (valid) {
                var token = authServices.generateToken(data[0]);
                return res.status(200).json({ error: false, user: data[0], token: token });
            }
            res.status(500).json({ error: true, message: 'Wrong email or password' });
        });
    }).catch(function (e) {
        console.error(e);
    });
}

function createUser(req, res) {
    console.log('create user');
    console.log(req.body);
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    var passwordHash = bcrypt.hashSync(password.trim(), 10);
    console.log(passwordHash);

    userServices.createUser(email, passwordHash).then(function (data) {
        var _data = _slicedToArray(data, 1),
            id = _data[0];

        userServices.findById(id).then(function (user) {
            console.log(user);
            var token = authServices.generateToken(user);
            res.status(200).json({ error: false, user: user[0], token: token });
        });
    }).catch(function (e) {
        console.log(e);
        console.log(e.code);
        var code = e.code;

        if (code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: true, message: 'Email already taken' });
        }
    });
}

module.exports = router;