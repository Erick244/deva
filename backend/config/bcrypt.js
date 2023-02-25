const bcrypt = require("bcrypt-nodejs");

const encryptPassword = password => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}

const comparePasswords = (password, confirmPassword) => {
	return bcrypt.compareSync(password, confirmPassword);
}

module.exports = { encryptPassword, comparePasswords }