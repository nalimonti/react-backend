'use strict';

var knex = require('../knex/knex.js');

var UserServices = {
    authenticate: authenticate
};

function authenticate(email, password) {
    return knex('users').where({ email: email, password: password });
}

module.exports = UserServices;