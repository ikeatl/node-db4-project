/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  await knex.schema
  .createTable('recipes', (table) => {
    table.increments('recipe_id').primary();
    table.string('recipe_name').unique().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  .createTable('steps', (table) => {
    table.increments('step_id').primary();
    table.integer('recipe_id').unsigned().notNullable();
    table.foreign('recipe_id').references('recipes_id').onDelete('RESTRICT').onUpdate('RESTRICT');
    table.integer('step_number').notNullable();
    table.string('step_instructions').notNullable()
  })
  .createTable('ingredients', (table) => {
    table.increments('ingredient_id').primary();
    table.string('ingredient_name').notNullable(); 
  })

  .createTable('step_ingredients', (table)=> {
    table.increments('step_ingredient_id').primary();
    table.integer('step_id').unsigned().notNullable()
    .references('step_id').inTable('steps')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
    table.integer('ingredient_id').unsigned().notNullable()
    .references('ingredient_id').inTable('ingredients')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
    table.decimal('quantity').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    await knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes');
};
