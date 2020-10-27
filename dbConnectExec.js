const sql = require('mssql')
const lopezConfig = require('./config.js')
//const is a new way of doing var, but it is constant and doesnt change

const config = {
    user: lopezConfig.DB.user,
    password: lopezConfig.DB.password,
    server: lopezConfig.DB.server, 
    // You can use 'localhost\\instance' to connect to named instance
    database: lopezConfig.DB.database,
}


async function executeQuery(aQuery){
    var connection = await sql.connect(config)
    var result = await connection.query(aQuery)


    console.log(result)
    return result.recordset
}

module.exports = {executeQuery: executeQuery}
// executeQuery(`SELECT*From ClientTBL
// Left Join WorkoutTBL
// on ClientTBL.ClientID = WorkoutTBL.ClientID`)



