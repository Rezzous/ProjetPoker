module.exports = (app, db) => {
	const coachModel = require("../models/CoachModel")(db);
	
	app.get("/api/v1/coaches/all", async (req, res) => {
		await coachModel.getAllCoaches().then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			res.json({ status: 200, results: res1 });
		});
	});

    app.get("/api/v1/coaches/one/:id", async (req, res) => {
		let id = req.params.id;
		await coachModel.getOneCoach(id).then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			res.json({ status: 200, results: res1 });
		});
	});

    app.patch("/api/v1/coaches/update/:id", async (req, res) => {
		let id = req.params.id;
		await coachModel.updateOneCoach(id).then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			res.json({ status: 200, msg: "Données du coach bien modifiées" });
		});
	});

    app.delete("/api/v1/coaches/delete/:id", async (req, res) => {
		let id = req.params.id;
		await coachModel.deleteOneCoach(id).then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			res.json({ status: 200, msg: "Coach bien supprimée" });
		});
	});
}