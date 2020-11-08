const jwt = require('jsonwebtoken')
const config = require('../config.js')
const db= require('../dbConnectExec.js')

const auth = async(req,res, next)=>{
    console.log(req.header('Authorization'))
    try {
       //1. decode token
            let myToken = req.header('Authorization').replace('Bearer ', '')
            //console.log(myToken)
            let decodedToken = jwt.verify(myToken, config.JWT)
            //console.log(decodedToken)

            let clientPK = decodedToken.pk;
            console.log(clientPK)
       //2. compare token with db token
            let query = `SELECT ClientID, FName, LName,Email FROM ClientTBL
            WHERE ClientID = ${clientPK} and Token = '${myToken}'`

            let returnedUser= db.executeQuery(query)
           // console.log(returnedUser)

            //3. save user info in request -- not returning just record set
            if(returnUser[0]){
                req.contact=returnedUser[0];
                next()
            }
            else{res.status(401).send('Authentication Failed')}


    }
    //i am having an error log here, do not know what the error is
    catch(myError){res.status(401).send("Authentication Failed")}
}

module.exports= auth