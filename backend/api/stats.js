module.exports = app => {
	const get = async (req, res) => {
		try {
			const usersCount = await app.db("users")
				.count()
				.first();
			const categoriesCount = await app.db("categories")
				.count()
				.first();
			const themesCount = await app.db("themes")
				.count()
				.first();
			const subThemesCount = await app.db("subThemes")
				.count()
				.first();
			const stats = {
				usersCount: usersCount.count,
				categoriesCount: categoriesCount.count,
				themesCount: themesCount.count,
				subThemesCount: subThemesCount.count
			}
			res.status(200).send(stats);
		} catch (err) {
			return res.status(500).send(err);
		}
	}

	return { get }
}