require('dotenv').config();

module.exports = {
    user: process.env.ORACLE_STEWEBID,
	password: process.env.ORACLE_STEWEBPW,
	connectString: process.env.ORACLE_STEWEBTNS,
}