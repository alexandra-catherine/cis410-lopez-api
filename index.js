const express= require('express')
const db= require('./dbConnectExec.js')
const app = express();
app.get("/hi",(req,res)=>{ 
    res.send("hello world")
})

app.get("/clients", (req,res)=>{
    //get data from db
    db.executeQuery(`SELECT*From ClientTBL
    Left Join WorkoutTBL
    on ClientTBL.ClientID = WorkoutTBL.ClientID`)
    .then((result)=> {
        res.status(200).send(result)
    }) 
    .catch((err)=>{
        console.log(err);
        res.status(500).send()
    })
})

app.listen(5000, ()=> 
    console.log("app is running on port 5000"))
