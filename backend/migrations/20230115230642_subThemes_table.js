/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("subThemes", table => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.binary("content");
		table.integer("themeId").references("id")
			.inTable("themes").notNullable();
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("subThemes");
};