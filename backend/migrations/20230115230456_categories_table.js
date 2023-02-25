/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("categories", table => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.string("imageUrl", 1000);
		table.integer("userId").references("id")
			.inTable("users");
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("categories");
};