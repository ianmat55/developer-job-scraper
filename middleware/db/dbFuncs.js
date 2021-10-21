const pool = require('./dbConfig');

function checkEmail(email) {
	const checker = pool.query(
		"SELECT * FROM users WHERE email = ($1);", [email]
		);
		console.log(checker);
	return checker;	 
};

async function createUser(name, password, email) {
	try {
		const insert = await pool.query(
			"INSERT INTO users(name, password, email) VALUES($1, $2, $3)", [name, password, email]
		);
		return insert;
	} catch {
		console.log("something went wrong");
	} 
};

function selectById(id) {
	const query = pool.query('SELECT * FROM users WHERE user_id = $1', [id] );
	return query;
}
module.exports = { checkEmail, createUser, selectById };