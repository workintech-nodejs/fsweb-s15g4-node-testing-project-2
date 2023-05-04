/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const all = knex.schema.createTable("Gorevler",t=>{
    t.increments("GorevId")
    t.string("Adi").notNullable()
    t.string("Aciklama")
  })
  .createTable("Tasklar",t=>{
    t.increments("TaskId")
    t.string("Adi").notNullable()
    t.string("Aciklama")
    t.dateTime("Tarih").defaultTo(knex.fn.now())
    t.integer("GorevId").references("GorevId").inTable("Gorevler")
  });
  ;
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
            .dropTableIfExists("Tasklar")
            .dropTableIfExists("Gorevler")
};
