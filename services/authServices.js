const knex = require('../knex/knex.js');
const jwt = require('jsonwebtoken');

let AuthServices = {
    generateToken
};

function generateToken(user) {
    console.log(user);
    return jwt.sign({
        id: user.id,
        email: user.email
    }, 'secretkey', {
        expiresIn: 60 * 60 * 24
    })
}

module.exports = AuthServices;