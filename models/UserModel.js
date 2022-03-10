const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (_db) => {
	db = _db;
	return UserModel;
};

class UserModel {
	static getUserByMail(email) {
		return db
			.query("SELECT firstName, lastName, email, password FROM users WHERE email = ?", [email])
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	static saveOneUser(req) {
		return bcrypt.hash(req.body.password, saltRounds).then((hash) => {
			return db
				.query(
					'INSERT INTO users (firstName, lastName, email, password, creationTimestamp) VALUES (?, ?, ?, ?, NOW())',
					[
						req.body.firstName,
						req.body.lastName,
						req.body.email,
						hash,
					]
				)
				.then((response) => {
					return response;
				})
				.catch((err) => {
					return err;
				});
		});
	}

	static getOneUser(id) {
		return db
			.query("SELECT firstName, lastName, email, password FROM users WHERE id= ?", [id])
			.then((user) => {
				if (user.length === 0) {
					return {
						status: 401,
						error: "email incorrect",
					};
				} else {
					return user;
				}
			});
	}

	
}
