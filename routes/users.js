const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userServices = require('../services/userServices');
const authServices = require('../services/authServices');

router.post('/login', login);
router.post('/', createUser);

function login(req, res) {
    console.log('logging in');
    console.log(req.body);
    const { email, password } = req.body;
    userServices.findByEmail(email).then(data => {
        const [ user ] = data;

        if (!user) {
            return res.status(400).json({error: true, message: 'User not found'});
        }

        const { password: hash } = user;
        bcrypt.compare(password, hash, (err, valid) => {
            if (valid) {
                const token = authServices.generateToken(data[0]);
                return res.status(200).json({error: false, user: data[0], token })
            }
            res.status(500).json({error: true, message: 'Wrong email or password'})
        })
    }).catch(e => {
        console.error(e);
    })
}

function createUser(req, res) {
    console.log('create user');
    console.log(req.body);
    const { email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password.trim(), 10);
    console.log(passwordHash);

    userServices.createUser(email, passwordHash).then(data => {
        const [ id ] = data;
        userServices.findById(id).then(user => {
            console.log(user);
            const token = authServices.generateToken(user);
            res.status(200).json({error: false, user: user[0], token })
        })
    }).catch(e => {
        const { code } = e;
        if (code === 'ER_DUP_ENTRY') {
            return res.status(400).json({error: true, message: 'Email already taken'})
        }
    })
}

module.exports = router;
