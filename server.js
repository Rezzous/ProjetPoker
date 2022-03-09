// 'use strict'

//import de modules
const express = require("express")
const mysql = require("promise-mysql");
const cors = require('cors');

const app = express();

require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Import de nos routes
const authRoutes = require("./routes/authRoutes");
const coachRoutes = require("./routes/coachRoutes");
const testimonyRoutes = require("./routes/testimonyRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

// connexion BDD
const HOST = process.env.HOST_DB || config.db.host;
const DATABASE = process.env.DATABASE || config.db.database;
const USER = process.env.USER || config.db.user;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT || 8000;


mysql
	.createConnection({
		host: HOST,
		database: DATABASE,
		user: USER,
		password: PASSWORD,
		// port: PORT,
	})
	.then((db) => {
		// console.log('raa',db);
		console.log(`Bien connecté à : ${db.config.database}`);
		setInterval(async () => {
			let res = await db.query("SELECT 1");
		}, 10000);

		app.get("/", (req, res) => {
			res.json({ status: 200, msg: "Bienvenue sur mon site de formation de poker !!!", DB: db.config.host });
		});

		// appel de nos routes
		authRoutes(app, db);
		coachRoutes(app, db);
		testimonyRoutes(app, db);
		userRoutes(app, db);
		messageRoutes(app, db);
		
	})

	.catch((err) => {
		console.log(`Pas connecté :'( -> ${err}`);
	});


app.listen(PORT, () => {
	console.log(`Listening on port ---> ${PORT} `);
});