const { comparePasswords } = require("../config/bcrypt");
const { authSecret } = require("../.env");
const jwt = require("jwt-simple");

module.exports = app => {
	const signin = async (req, res) => {
		if (!req.body.email || !req.body.password) return res.status(401).send("Insira Email e Senha");

		const user = await app.db("users")
			.where({ email: req.body.email })
			.first()

		if (!user) return res.status(400).send("Usuário não cadastrado");

		const isMatch = comparePasswords(req.body.password, user.password);
		if (!isMatch) return res.status(401).send("Senha invalida");

		const now = Math.floor(Date.now() / 1000);

		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
			imageUrl: user.imageUrl,
			admin: user.admin,
			iat: now,
			exp: now + (60 * 60 * 24 * 7)
		}

		res.json({
			...payload,
			token: jwt.encode(payload, authSecret)
		})
	}

	const validateToken = (req, res) => {
		const user = req.body || null;
		try {
			if (user) {
				const token = jwt.decode(user.token, authSecret);
				if (token.exp * 1000 > Date.now()) {
					res.send(true);
				}
			}
		} catch (e) {
			console.log("[JWT_TOKEN ERROR]" + e);
		}
		if (!res.headersSent) {
			res.send(false);
		}
	}

	return { signin, validateToken }
}