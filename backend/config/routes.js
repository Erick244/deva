const admin = require("./admin");

module.exports = app => {
	app.post("/signin", app.api.auth.signin);
	app.post("/signup", app.api.user.save);
	app.post("/validateToken", app.api.auth.validateToken);

	app.route("/stats")
		.all(app.config.passport.authenticate())
		.get(admin(app.api.stats.get));
	app.route("/users")
		.all(app.config.passport.authenticate())
		.get(admin(app.api.user.get))
		.post(admin(app.api.user.save))
		.patch(app.api.user.safeUpdate)
	app.route("/users/:id")
		.all(app.config.passport.authenticate())
		.put(admin(app.api.user.save))
		.get(admin(app.api.user.getById))
		.delete(admin(app.api.user.remove))
		.patch(admin(app.api.user.safeUpdate));
	app.route("/categories")
		.all(app.config.passport.authenticate())
		.get(admin(app.api.category.get))
		.post(app.api.category.save);
	app.route("/categories/:id")
		.all(app.config.passport.authenticate())
		.put(admin(app.api.category.save))
		.patch(admin(app.api.category.save))
		.get(admin(app.api.category.getById))
		.delete(admin(app.api.category.remove));
	app.route("/userCategories")
		.all(app.config.passport.authenticate())
		.get(app.api.category.getFromUser);
	app.route("/userCategories/:id")
		.all(app.config.passport.authenticate())
		.delete(app.api.category.removeByUser)
		.get(app.api.category.getByIdFromUser)
		.patch(app.api.category.safeUpdate);
	app.route("/themes")
		.all(app.config.passport.authenticate())
		.post(app.api.theme.save)
		.get(admin(app.api.theme.get));
	app.route("/themes/:id")
		.all(app.config.passport.authenticate())
		.put(admin(app.api.theme.save))
		.patch(admin(app.api.theme.save))
		.get(admin(app.api.theme.getById))
		.delete(admin(app.api.theme.remove));
	app.route("/userThemes")
		.all(app.config.passport.authenticate())
		.get(app.api.theme.getFromCategories);
	app.route("/userThemes/:id")
		.all(app.config.passport.authenticate())
		.get(app.api.theme.getByIdFromUser)
		.patch(app.api.theme.safeUpdate)
		.delete(app.api.theme.removeByUser);
	app.route("/subThemes")
		.all(app.config.passport.authenticate())
		.post(app.api.subTheme.save)
		.get(admin(app.api.subTheme.get));
	app.route("/subThemes/:id")
		.all(app.config.passport.authenticate())
		.get(admin(app.api.subTheme.getById))
		.put(admin(app.api.subTheme.save))
		.patch(admin(app.api.subTheme.save))
		.delete(admin(app.api.subTheme.remove));
	app.route("/userSubThemes")
		.all(app.config.passport.authenticate())
		.get(app.api.subTheme.getByThemes);
	app.route("/userSubThemes/:id")
		.all(app.config.passport.authenticate())
		.get(app.api.subTheme.getByIdFromUser)
		.patch(app.api.subTheme.safeUpdate)
		.delete(app.api.subTheme.removeFromUser);
}