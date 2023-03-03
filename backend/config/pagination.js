module.exports = app => {
	const paginate = async (page, table) => {
		let select = null;
		switch (table) {
			case "users":
				select = ["id", "name", "email", "admin"];
				break;
			case "categories":
				select = ["id", "name", "userId"];
				break;
			case "themes":
				select = ["id", "name", "categoryId"];
				break;
			case "subThemes":
				select = ["id", "name", "themeId"];
				break;
		}

		const limit = 10;
		const result = await app.db(table).count("id").first();
		const count = parseInt(result.count);
		if (select) {
			const data = await app.db(table)
				.select(select)
				.limit(limit).offset(page * limit - limit);
			return {data, count, limit};
		}
	}

	return { paginate }
}