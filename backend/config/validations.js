function existsOrError(value, msg) {
	if (!value) throw msg;
	if (value > 0) return;
	if (Object.keys(value).length === 0 || value.length === 0) {
		throw msg;
	}
	return;
}

function equalsOrError(value1, value2, msg) {
	if (value1 === value2) {
		return;
	} else {
		throw msg;
	}
}

function notExistsOrError(value, msg) {
	try {
		existsOrError(value, msg);
	} catch(msg) {
		return;
	}
	throw msg;
}

module.exports = {
	equalsOrError,
	existsOrError,
	notExistsOrError
};