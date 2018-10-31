
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', t => {
        t.increments('id').primary();
        t.string('title', 200).notNullable();
        t.text('content', 200).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');
};
