const { equalsOrError, existsOrError, notExistsOrError } = require("../config/validations");
const { encryptPassword } = require("../config/bcrypt");

module.exports = app => {
	const save = async (req, res) => {
		const user = {...req.body};

		if (req.params.id) user.id = req.params.id;
		if (!req.originalUrl.startsWith('/users')) user.admin = false;
		if (!req.user || !req.user.admin) user.admin = false;

		try {
			existsOrError(user.name, "Insira o nome");
			existsOrError(user.email, "Insira o email");
			existsOrError(user.password, "Insira a senha");
			existsOrError(user.confirmPassword, "Insira a confirmação de senha");
			equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

			const existsUser = await app.db("users")
				.where({ email: user.email }).first();

			if (!user.id) {
				notExistsOrError(existsUser, "E-mail já cadastrado");
			}
		} catch (msg) {
			return res.status(400).send(msg);
		}

		user.password = encryptPassword(user.password);
		delete user.confirmPassword;

		if (user.id) {
			app.db("users")
				.where({ id: user.id })
				.update(user)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		} else {
			app.db("users")
				.insert(user)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err));
		}
	}

	const get = (req, res) => {
		app.db("users")
			.select("id", "name", "email", "admin", "imageUrl")
			.then(users => res.status(200).json(users))
			.catch(err => res.status(500).send(err));
	}

	const getById = async (req, res) => {
		try {
			const user = await app.db("users")
				.select("id", "name", "email", "admin", "imageUrl")
				.where({ id: req.params.id })
				.first();
			existsOrError(user, "Usuário não encontrado.");
			res.status(200).json(user);
		} catch (msg) {
			res.status(400).send(msg);
		}
	}

	const remove = async (req, res) => {
		try {
			const userCategories = await app.db("categories")
				.where({ userId: req.params.id })
				.first();
			notExistsOrError(userCategories, "Usuário possui categorias!");
		} catch (msg) {
			res.status(400).send(msg);
		}

		app.db("users")
			.where({ id: req.params.id })
			.delete()
			.then(() => res.status(204).send())
			.catch(err => res.status(500).send(err));
	}

	const safeUpdate = (req, res) => {
		const user = {...req.body};
		user.id = req.params.id || req.user.id;
		if (!req.user.admin || !user.admin) user.admin = false;
		try {
			existsOrError(user.name, "Insira um nome para ser alterado");
			if (req.params.id) existsOrError(user.email, "Insira o email para ser alterado");

			app.db("users")
				.where({ id: user.id })
				.select("name", "imageUrl", "email", "admin")
				.update(user)
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} catch (msg) {
			return res.status(400).send(msg);
		}
	}

	return { save, get, getById, remove, safeUpdate }
}