module.exports = (_db) => {
	db = _db;
	return TestimonyModel;
};

class TestimonyModel {
	
    static getAllTestimonies () {
		return db
			.query("SELECT * FROM testimony ")
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	static saveOneTestimony(req) {
		return db
			.query("INSERT INTO testimony (lastName, firstName, title, content, creationTimestamp) VALUES( ?, ?, ?, ?, NOW())", 
            [
                req.body.lastName,
                req.body.firstName,
                req.body.title,
                req.body.content,
            ])
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}
}