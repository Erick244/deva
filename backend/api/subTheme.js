const { existsOrError } = require("../config/validations");

module.exports = app => {
	const save = async (req, res) => {
		const subTheme = { ...req.body };
		if (req.params.id) subTheme.id = req.params.id;

		try {
			existsOrError(subTheme.name, "Informe o nome do Sub-Tema");
			existsOrError(subTheme.themeId, "Informe o ID do tema");

			const theme = await app.db("themes")
				.where({ id: subTheme.themeId })
				.first();
			existsOrError(theme, "O tema informado não existe");
		} catch (msg) {
			return res.status(400).send(msg);
		}

		if (subTheme.id) {
			app.db("subThemes")
				.where({ id: subTheme.id })
				.update(subTheme)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		} else {
			app.db("subThemes")
				.insert(subTheme)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		}
	}

	const get = (req, res) => {
		app.db("subThemes")
			.select("id", "name", "themeId")
			.then(subThemes => res.status(200).send(subThemes))
			.catch(err => res.status(500).send(err))
	}


	const getById = async (req, res) => {
		try {
			const subTheme = await app.db("subThemes")
				.where({ id: req.params.id })
				.first();
			existsOrError(subTheme, "Sub-Tema não existe");
			res.status(200).send(subTheme);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	const getByIdFromUser = async (req, res) => {
		try {
			const subTheme = await app.db("subThemes")
				.where({ id: req.params.id })
				.first();
			const themeOfSubThemes = await app.db("themes")
				.where({ id: subTheme.themeId })
				.first();
			const categoryOfUser = await app.db("categories")
				.where({ userId: req.user.id, id: themeOfSubThemes.categoryId })
				.first();
			existsOrError(categoryOfUser, "Sub-Tema não encontrados");
			existsOrError(themeOfSubThemes, "Sub-Tema não encontrados");
			existsOrError(subTheme, "Sub-Tema não existe");
			res.status(200).send(subTheme);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	const getByThemes = async (req, res) => {
		try {
			const subThemes = await app.db("subThemes")
				.where({ themeId: req.query.themeId });
			existsOrError(subThemes, "Sub-Temas não encontrados");
			const themeOfSubTheme = await app.db("themes")
				.where({ id: +req.query.themeId })
				.first();
			existsOrError(themeOfSubTheme, "Sub-Temas não encontrados");
			const categoryOfUser = await app.db("categories")
				.where({ userId: req.user.id, id: themeOfSubTheme.categoryId })
				.first();
			existsOrError(categoryOfUser, "Sub-Temas não encontrados");
			res.status(200).send(subThemes);
		} catch (msg) {
			return res.status(204).send();
		}
	}

	const remove = (req, res) => {
		app.db("subThemes")
			.where({ id: req.params.id })
			.delete()
			.then(() => res.status(204).send())
			.catch(err => res.status(500).send(err));
	}

	const removeFromUser = async (req, res) => {
		try {
			const subTheme = await app.db("subThemes")
				.where({ id: req.params.id })
				.first();
			existsOrError(subTheme, "Sub-Tema não encontrado")
			const themeOfSubTheme = await app.db("themes")
				.where({ id: subTheme.themeId })
				.first();
			existsOrError(themeOfSubTheme, "Sub-Tema não encontrado");
			const categoryOfUser = await app.db("categories")
				.where({ userId: req.user.id, id: themeOfSubTheme.categoryId })
				.first();
			existsOrError(categoryOfUser, "Sub-Tema não encontrado");
			remove(req, res);
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	const safeUpdate = async (req, res) => {
		const subTheme = { ...req.body };
		if (req.params.id) subTheme.id = req.params.id;
		try {
			const themeOfSubTheme = await app.db("themes")
				.where({ id: subTheme.themeId })
				.first();
			existsOrError(themeOfSubTheme, "Sub-Tema não encontrado");
			const categoryOfUser = await app.db("categories")
				.where({ userId: req.user.id, id: themeOfSubTheme.categoryId })
				.first();
			existsOrError(categoryOfUser, "Sub-Tema não encontrado");
			app.db("subThemes")
				.where({ id: subTheme.id })
				.update(subTheme)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	return { save, get, getById, remove, getByThemes, getByIdFromUser, safeUpdate, removeFromUser }
}