'use strict';

var knex = require('../knex/knex.js');
var jwt = require('jsonwebtoken');

var AuthServices = {
    generateToken: generateToken
};

function generateToken(user) {
    console.log(user);
    return jwt.sign({
        id: user.id,
        email: user.email
    }, 'secretkey', {
        expiresIn: 60 * 60 * 24
    });
}

module.exports = AuthServices;