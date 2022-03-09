const withAuth = require("../withAuth");

module.exports = function (app, db) {
	const userModel = require("../models/UserModel")(db);

	app.get("/api/v1/user/checktoken", withAuth, async (req, res, next) => {
		let user = await userModel.getOneUser(req.id);
		res.json({ status: 200, user: user });
	});
};