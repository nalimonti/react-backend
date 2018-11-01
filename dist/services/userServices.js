'use strict';

var knex = require('../knex/knex.js');

var UserServices = {
    authenticate: authenticate,
    createUser: createUser,
    findById: findById,
    findByEmail: findByEmail
};

function authenticate(email, password) {
    return knex('users').where({ email: email, password: password });
}

function createUser(email, password) {
    return knex('users').insert({ email: email, password: password }).returning('*');
}

function findById(id) {
    return knex('users').where({ id: id });
}

function findByEmail(email) {
    return knex('users').where({ email: email });
}

module.exports = UserServices;