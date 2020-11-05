const jwt = require('jsonwebtoken')

let myToken = jwt.sign({pk: 1234} ,"secretPassword", {expiresIn: '60 Minutes'})

console.log('my token', myToken)

let myDecoded = jwt.verify(myToken, 'secretPassword');

console.log('my decode', myDecoded)