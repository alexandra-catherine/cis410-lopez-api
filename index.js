const express= require('express')
const db= require('./dbConnectExec.js')
const app = express();
app.get("/hi",(req,res)=>{ 
    res.send("hello world")
})

app.get("/clients", (req,res)=>{
    //get data from db
    db.executeQuery(`SELECT*From WorkoutTBL
    Left Join ClientTBL
    on  WorkoutTBL.ClientID = ClientTBL.ClientID `)
    .then((result)=> {
        res.status(200).send(result)
    }) 
    .catch((err)=>{
        console.log(err);
        res.status(500).send()
    })
})
app.get("/clients/:pk", (req,res)=>{
    var pk= req.params.pk
    //console.log("my pk: ", pk) 
    var myQuery= `SELECT*From WorkoutTBL
    Left Join ClientTBL
    on  WorkoutTBL.ClientID = ClientTBL.ClientID 
    Where ClientTBL.ClientID =  ${pk}`

    db.executeQuery(myQuery)
        .then((client) => {
            //console.log("Client: " + client)
            if(client[0]){
                res.send(client[0])
            }
            else{
                res.status(404).send('bad request')
            }
        })
        .catch((err)=>{
            console.log("error in clients/pk", err)
            res.status(500).send()
        })
})
app.listen(5000, ()=> 
    console.log("app is running on port 5000"))
