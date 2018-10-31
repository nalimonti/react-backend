'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('surveys', function (t) {
        t.increments('id').primary();
        t.string('name', 200);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('surveys');
};