const { existsOrError, notExistsOrError } = require("../config/validations");

module.exports = app => {
	const save = async (req, res) => {
		const theme = { ...req.body };
		if (req.params.id) theme.id = req.params.id;

		try {
			existsOrError(theme.name, "Informe o nome do tema");
			existsOrError(theme.categoryId, "Informe o ID da categoria");
			const category = await app.db("categories")
				.where({ id: theme.categoryId })
				.first();
			existsOrError(category, "Categoria não existe");
		} catch (msg) {
			return res.status(400).send(msg);
		}

		if (theme.id) {
			app.db("themes")
				.update(theme)
				.where({ id: theme.id })
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		} else {
			app.db("themes")
				.insert(theme)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		}
	}

	const safeUpdate = async (req, res) => {
		const theme = { ...req.body };
		theme.id = req.params.id;
		try {
			existsOrError(theme.name, "Informe o nome do Tema");
			const categoryTheme = await app.db("categories")
				.where({ id: theme.categoryId, userId: req.user.id })
				.first()
			existsOrError(categoryTheme, "Você não é um administrador");
		} catch (msg) {
			return res.status(400).send(msg);
		}

		app.db("themes")
			.where({ id: theme.id })
			.select("name")
			.update(theme)
			.then(() => res.status(204).send())
			.catch(err => res.status(500).send());
	}

	const get = (req, res) => {
		app.db("themes")
			.then(themes => res.status(200).send(themes))
			.catch(err => res.status(500).send(err));
	}

	const getById = async (req, res) => {
		try {
			const theme = await app.db("themes")
				.where({ id: req.params.id })
				.first();
			existsOrError(theme, "Tema não encontrado");
			res.status(200).send(theme);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	const getByIdFromUser = async (req, res) => {
		try {
			const theme = await app.db("themes")
				.where({ id: req.params.id })
				.first();
			existsOrError(theme, "Tema não encontrado");
			const categoryTheme = await app.db("categories")
				.where({ userId: req.user.id, id: theme.categoryId })
				.first();
			existsOrError(categoryTheme, "Tema não encontrado");
			res.status(200).send(theme);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	const getFromCategories = async (req, res) => {
		try {
			const categoryFromQuery = await app.db("categories")
				.where({ userId: req.user.id, id: +req.query.categoryId })
				.first();
			existsOrError(categoryFromQuery, "Categoria não existe.");
			const themes = await app.db("themes")
				.where({ categoryId: +req.query.categoryId });
			res.status(200).send(themes);
		} catch (msg) {
			return res.status(400).send();
		}
	}

	const remove = async (req, res) => {
		try {
			const subTheme = await app.db("subThemes")
				.where({ themeId: req.params.id })
				.first();
			notExistsOrError(subTheme, "Tema possui sub-temas");
		} catch (msg) {
			return res.status(400).send(msg);
		}

		app.db("themes")
			.where({ id: req.params.id })
			.delete()
			.then(() => res.status(204).send())
			.catch(err => res.status(500).send(err));
	}

	const removeByUser = async (req, res) => {
		try {
			const theme = await app.db("themes")
				.where({ id: req.params.id })
				.first();
			existsOrError(theme, "Tema não encontrado");

			const categoryTheme = await app.db("categories")
				.where({ id: theme.categoryId, userId: req.user.id })
				.first();
			existsOrError(categoryTheme, "Tema não encontrado");

			remove(req, res);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	return { save, get, getById, remove, safeUpdate, removeByUser, getByIdFromUser, getFromCategories }
}