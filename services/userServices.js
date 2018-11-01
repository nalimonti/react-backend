const knex = require('../knex/knex.js');

let UserServices = {
    authenticate
};

function authenticate(email, password) {
    return knex('users').where({ email, password })
}


module.exports = UserServices;