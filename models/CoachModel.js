module.exports = (_db) => {
	db = _db;
	return CoachModel;
};
//test
class CoachModel {
	
    static getAllCoaches () {
		return db
			.query("SELECT id, firstName, lastName, pseudo, description, type1, type2, type3, tauxHoraire FROM coaches ")
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	static getOneCoach(id) {
		return db
			.query("SELECT id, firstName, lastName, pseudo, description, type1, type2, type3, tauxHoraire FROM coaches WHERE id= ?", [id])
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}
}