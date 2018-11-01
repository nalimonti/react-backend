const knex = require('../knex/knex.js');

let UserServices = {
    authenticate,
    createUser,
    findById,
    findByEmail
};

function authenticate(email, password) {
    return knex('users').where({ email, password })
}

function createUser(email, password) {
    return knex('users').insert({ email, password }).returning('*')
}

function findById(id) {
    return knex('users').where({ id })
}

function findByEmail(email) {
    return knex('users').where({ email })
}

module.exports = UserServices;