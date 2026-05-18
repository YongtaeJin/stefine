require('dotenv').config();
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig')

oracledb.initOracleClient({ libDir: process.env.ORACLE_STEWEBCLI });

async function queryArray(sql, bindParams, options) {
	let connection;
	let result;
	
	try {
		oracledb.autoCommit=true;
		oracledb.fetchAsString = [ oracledb.CLOB ];     // CLOB 처리
		oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
		
		connection = await oracledb.getConnection(dbConfig);		
		result = await connection.execute(sql, bindParams, options);
	} catch (err) {
		console.error(err);
	} finally {
		if (connection) {
			try {
				// Connections should always be released when not needed				
				await connection.close();			
				if (sql.toLowerCase().indexOf('select') == 0) {
					return result.rows;
				} 
				else {					
					return result.rowsAffected;
				}				
				
		  	} catch (err) {
				console.error(err);
			}
		}
	}
	
};

async function queryArray2(query) {	
	let connection;
	try {
		oracledb.autoCommit = false;
		oracledb.fetchAsString = [oracledb.CLOB];
		oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

		connection = await oracledb.getConnection(dbConfig);
		
		// 쿼리 배열을 순회하며 실행
		for (const { sql, values } of query) {
			// console.log(sql, values)
			try {
				if(!values) {
					await connection.execute(sql);
				}
				else {				
					await connection.execute(sql, values);
				}
			} catch (err) {
				console.error('Error executing query:', err);
				console.log('SQL:', sql);
				console.log('Values:', values);
				throw err; // rethrow the error to trigger rollback
			}
		}
		// 모든 쿼리 실행 완료 후 커밋
		await connection.commit();
	} catch (err) {
		
		console.error('Transaction Error: ', err);
		
		if (connection) {
			try {
				await connection.rollback();
			} catch (rollbackErr) {
				console.error('Rollback Error: ', rollbackErr);
			}
		}
		throw err; // rethrow the error after rollback
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (closeErr) {
				console.error('Error closing connection: ', closeErr);
			}
		}
	}
	return true; // indicate successful execution	
};

async function queryObject(sql, bindParams, options) {
	const data = await queryArray(sql, bindParams, options);	
	return data;	
}


module.exports = queryArray; 
module.exports = queryArray2; 
module.exports.queryArray = queryArray; 
module.exports.queryArray2 = queryArray2; 
module.exports.queryObject = queryObject;





