module.exports = (app, db) => {
	const messageModel = require("../models/MessageModel")(db);
	
	app.get('/api/v1/messages/all/:id', async (req, res) => {
		let id = req.params.id;
		await messageModel.getMessagesByIdCoach(id).then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			else {res.json({ status: 200, results: res1 })};
		});
	});

	app.get('/api/v1/messages/all', async (req, res) => {
		await messageModel.getMessages().then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			else {res.json({ status: 200, results: res1 })};
		});
	});

    app.put("/api/v1/messages/save", async (req, res) => {
        await messageModel.saveOneMessage(req).then((res1) => {
			if (res1.code) {
				res.json({ status: 500, error: res1.message });
			}
			else {res.json({ status: 200, results: res1 })};
		});
    })
}