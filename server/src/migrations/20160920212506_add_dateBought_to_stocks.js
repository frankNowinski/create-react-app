
exports.up = function(knex, Promise) {
  return knex.schema.table('stocks', function(table) {
    table.string('dateBought').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('stocks', function(table) {
    table.dropColumn('dateBought');
  });
};
