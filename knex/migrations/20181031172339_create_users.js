
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', t => {
        t.increments('id').primary();
        t.string('email', 200).unique().notNullable();
        t.string('password', 200).notNullable();
        t.timestamp('created_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
