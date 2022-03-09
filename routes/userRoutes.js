const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "mesocyclone";

module.exports = (app, db) => {
	const userModel = require("../models/UserModel")(db);

	app.put("/api/v1/user/save", async (req, res) => {
		await userModel.getUserByMail(req.body.email)
        .then(async (res1) => {
			if (res1.length > 0) {
				return res.json({ status: 401, msg: "Cet email existe déjà dans notre base de données" });
			}
			await userModel.saveOneUser(req)
            .then((res2) => {
				if (res2.code) {
					res.json({ status: 500, msg: res2.message });
				}
				res.json({ status: 200, msg: "Bienvenue sur Poker Coaching" });
			});
		});
	});

	app.put('/api/v1/user/login', async(req, res)=>{
        await userModel.getUserByMail(req.body.email)
        .then(user=>{
            if(user.length === 0){
                return res.json({status: 404, msg: "Pas d'utilisateur enregistré lié à cet email !"})
            }
            bcrypt.compare(req.body.password, user[0].password)
            .then(same=>{
                if(same){
                    // création d'un const payload avec nos infos (email et id dans un objet)
                    const payload = {email: req.body.email, id: user[0].id}
                    // création d'une const token qui va créé le token avec la fonction sign de jwt
                    const token = jwt.sign(payload, secret)
                    res.json({status: 200, token: token, user_id: user[0].id, msg: "Vous êtes connecté !"})
                } else {
                    res.json({status: 401, msg: "Votre mot de passe est incorrect"})
                }
                
            })
            
        })
    })
};