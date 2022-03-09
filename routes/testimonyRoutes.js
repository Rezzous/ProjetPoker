module.exports = (app, db) => {
	const testimonyModel = require("../models/TestimonyModel")(db);
	
	app.get("/api/v1/testimonies/all", async (req, res) => {
		await testimonyModel.getAllTestimonies().then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			else {res.json({ status: 200, results: res1 })};
		});
	});

    app.put("/api/v1/testimonies/add", async (req, res) => {
        await testimonyModel.saveOneTestimony(req).then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			else {res.json({ status: 200, results: res1 })};
		});
    })
}