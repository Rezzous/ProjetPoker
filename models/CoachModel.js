module.exports = (_db) => {
	db = _db;
	return CoachModel;
};

class CoachModel {
	
    static getAllCoaches () {
		return db
			.query("SELECT * FROM coaches ")
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	static getOneCoach(id) {
		return db
			.query("SELECT * FROM coaches WHERE id= ?", [id])
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}
}