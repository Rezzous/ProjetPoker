module.exports = (_db) => {
	db = _db;
	return MessageModel;
};

class MessageModel {
	
    static getMessagesByIdCoach (id) {
		return db
			.query(`SELECT messages.lastName AS lN, messages.firstName AS fN, content, coachId, creationTimestamp FROM messages JOIN coaches ON coaches.id = messages.coachId WHERE coachId IN ('${id}')`)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}


	static saveOneMessage(req) {
		return db
			.query("INSERT INTO messages (lastName, firstName, content, coachId, creationTimestamp) VALUES(?, ?, ?, ?,NOW())", 
            [
                req.body.lastName,
                req.body.firstName,
                req.body.content,
                req.body.coachId,
            ])
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}
}