const { existsOrError, notExistsOrError } = require("../config/validations");

module.exports = app => {
	const save = async (req, res) => {
		const category = { ...req.body };
		if (!req.user.admin || !category.userId) category.userId = req.user.id;
		if (req.params.id) category.id = req.params.id;

		try {
			const userCategory = await app.db("users")
				.where({ id: category.userId })
				.first();
			existsOrError(userCategory, "O ID do Usuário é invalido")
			existsOrError(category.name, "Informe o nome da categoria");
		} catch (msg) {
			return res.status(400).send(msg);
		}

		if (category.id) {
			app.db("categories")
				.update(category)
				.where({ id: category.id })
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		} else {
			app.db("categories")
				.insert(category)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send());
		}
	}

	const safeUpdate = (req, res) => {
		const category = { ...req.body };
		category.id = req.params.id;
		try {
			existsOrError(category.name, "Informe o nome da categoria");
		} catch (msg) {
			return res.status(400).send(msg);
		}
		app.db("categories")
			.where({ id: category.id, userId: req.user.id })
			.select("name", "imageUrl")
			.update(category)
			.then(() => res.status(204).send())
			.catch(err => res.status(500).send(err));
	}

	const get = async (req, res) => {
		try {
			if (req.query.page) {
				const categories = await app.config.pagination.paginate(req.query.page, "categories");
				res.status(200).send(categories);
			} else {
				app.db("categories")
					.then(categories => res.status(200).send(categories))
					.catch(err => res.status(500).send(err));
			}
		} catch (err) {
			console.log(err);
		}

	}

	const getById = async (req, res) => {
		try {
			const category = await app.db("categories")
				.where({ id: req.params.id })
				.first();
			existsOrError(category, "Categoria não encontrada.");
			res.status(200).send(category);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	const getFromUser = (req, res) => {
		app.db("categories")
			.where({ userId: req.user.id })
			.then(categories => res.status(200).send(categories))
			.catch(err => res.status(500).send(err));
	}

	const getByIdFromUser = async (req, res) => {
		try {
			const category = await app.db("categories")
				.where({ id: req.params.id, userId: req.user.id })
				.first();
			existsOrError(category, "Categoria não encontrada");
			res.status(200).send(category);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	const remove = async (req, res) => {
		try {
			const themesFromCategory = await app.db("themes")
				.where({ categoryId: req.params.id })
				.first();
			notExistsOrError(themesFromCategory, "Categoria possui themas!");
		} catch (msg) {
			return res.status(400).send(msg);
		}

		app.db("categories")
			.where({ id: req.params.id })
			.delete()
			.then(() => res.status(204).send())
			.catch(err => res.status(500).send(err));
	}

	const removeByUser = (req, res) => {
		try {
			const categoryByUser = app.db("categories")
				.where({ userId: req.user.id })
				.first();
			existsOrError(categoryByUser, "Categoria não encontrada");
			remove(req, res);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	return { save, get, getById, remove, getFromUser, removeByUser, safeUpdate, getByIdFromUser }
}