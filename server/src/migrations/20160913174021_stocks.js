
exports.up = function(knex, Promise) {
  return knex.schema.createTable('stocks', function(table) {
    table.increments();
    table.string('symbol').notNullable();
    table.decimal('shares').notNullable();
    table.integer('userId').notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stocks');
};
