exports.up = function(knex, Promise) {
    return knex.schema.createTable('surveys', t => {
        t.increments('id').primary();
        t.string('name', 200);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('surveys');
};
