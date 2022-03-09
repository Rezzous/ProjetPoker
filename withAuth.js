const jwt = require("jsonwebtoken");
const secret = "mesocyclone";

const withAuth = (req, res, next) => {
	//on récupère notre token dans le header de la requète HTTP (toujours crypté)
	const token = req.headers["x-access-token"];
	if(token === undefined || token.includes('null')) {
		res.json({
			status: 404,
			msg: "token not found",
			token: token,
		});
	} else {
		//sinon (trouvé) utilisation de la fonction de vérification de jsonwebtoken.
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.json({
					status: 401,
					msg: "error, your token is invalid",
					token: token
				});
			} else {
				//sinon envoi de l'id décodé dans le payload du token
				req.id = decoded.id;
				//on sort de la fonction
				next();
			}
		});
	}
};

module.exports = withAuth;
