const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express= require('express')
const db= require('./dbConnectExec.js');
const { response } = require('express');
const app = express();
const config = require('./config.js')
const auth = require('./Middleware/authenticate.js')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.post("/contacts/logout", auth, (req,res)=>{
    var query= `UPDATE ClientTBL 
    SET Token = NULL
    WHERE ClientID = ${req.client.ClientID}
    `

    db.executeQuery(query)
    .then(()=>{res.status(200).send("you have logged out")})
    .catch((error)=>{
        console.log("error in POST /contacts/logout", error)
        res.status(500).send()
    })
})




app.get("/workouts/me", auth, async (req, res)=> {
   try{ 

    //this just returns the client ID not their other information 
    let clientID = req.client.ClientID;
    console.log("This is working")

    var myWorkouts = 
    `SELECT *
    FROM WorkoutTBL  
    WHERE WorkoutTBL.ClientID  = ${clientID}`

    let allWorkouts= await db.executeQuery(myWorkouts)
    console.log(allWorkouts)
     res.status(200).send(allWorkouts)}
     catch(error){
         console.log("error in POST /workouts/me", error)
         res.status(500).send() }
     

})

//this doesnt work either
//app.patch("/workouts/:pk", auth, async(req, res)=>{
   //  let workoutPK = req.params.pk
     //make sure that user can only edit their own workouts 
 //})

// app.delete("/workouts/:pk", auth, async(req, res)=>{
//     let workoutPK = req.params.pk
//     //make sure that user can only edit their own workouts 
// })

app.get("/", (req,res)=>{
    res.send("Hi world")
})


app.get("/hi",(req,res)=>{ 
    res.send("hello world")
})

app.post("/workouts", auth, async (req,res)=>{
    try{
   
    var activeTime = req.body.activeTime;
    var activeCalories = req.body.activeCalories;
    var averageBPM = req.body.averageBPM;
    var activeDistance = req.body.activeDistance;

   if( !activeTime|| !activeCalories|| !activeDistance|| !averageBPM|| !activeDistance){res.status(400).send("bad request")}

   
  console.log("here is the contact in /workouts", req.client)
  //res.send("here is your response")

    let insertQuery= `INSERT INTO WorkoutTBL(ActiveTime, ActiveCalories, AverageBPM, ActiveDistance, ClientID)
    OUTPUT inserted.WorkoutID, inserted.ActiveTime, inserted.AverageBPM, inserted.ActiveDistance, inserted.ActiveCalories, inserted.ClientID
    VALUES (${activeTime}, ${activeCalories}, ${averageBPM}, ${activeDistance}, ${req.client.ClientID})`

    console.log("here is my query: ", insertQuery)
    let insertedWorkout= await db.executeQuery(insertQuery)
    console.log(insertedWorkout)
    res.status(201).send(insertedWorkout[0])   
    }

    catch(error){
        console.log("error in POST /review", error);
        res.status(500).send()
    }
})

app.get("/contacts/me", auth, (req, res)=>{
    res.send(req.contact)
    
})


app.post("/contacts", async (req,res)=>{
    //res.send("creating client”)
    //console.log("request body", req.body)

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    if(!firstName || !lastName || !email || !password){
        return res.status(400).send("bad request")
    }

    firstName = firstName.replace("'","''")
    lastName = lastName.replace("'","''")

    emailCheckQuery = `SELECT email From ClientTBL
    WHERE email = '${email}'`

    var existingEmail = await db.executeQuery(emailCheckQuery)
   // console.log("Existing Email", existingEmail)

      if(existingEmail[0]){
      return res.status(409).send("Please enter different email")
     }

     var hashedPassword = bcrypt.hashSync(password)

     var insertQuery =`insert into ClientTBL(FName, LName, Email, PassWord)
     values('${firstName}', '${lastName}', '${email}', '${hashedPassword}')`

     db.executeQuery(insertQuery).then(()=>{
         res.status(201).send()})
     .catch((err)=>{
         console.log("error in POST /contacts", err)
         res.status(500).send()
     })
})

app.post("/contacts/login", async (req,res)=>{
    //console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;

    if(!email|| !password){
        return res.status(400).send('bad request')
    }

    //1. check that user email exists in DB
            var query = `SELECT * From ClientTBL Where Email = '${email}'`

            //var result = await db.executeQuery(query);
            let result;

            try{
                result = await db.executeQuery(query);
            }catch(myError){
                console.log("Error in contacts/login: ", myError)
                return res.status(500).send()
            }

            console.log(result)

            if(!result[0]){
                res.status(400).send("Invalid user credentials")
            }

    //2. check that password matches -- this is where my error is

            let user = result[0]
            console.log(user)

            if(!bcrypt.compareSync(password, user.PassWord)){
                console.log("Invalid Password");
                return res.status(400).send("Invalid User Credentials")
            }
    
    //3. generate a token
            let token = jwt.sign({pk: user.ClientID}, config.JWT, {expiresIn: '60 Minutes'})
            console.log(token)

    //4. save token in db and send token and user info back to user
            let setTokenQuery = `UPDATE ClientTBL
            SET Token = '${token}'
            Where ClientID = ${user.ClientID}
            ` 

            try{
                await db.executeQuery(setTokenQuery)
                res.status(200).send({
                    token: token,
                    user: {
                       FirstName: user.FName,
                       LastName : user.LName,
                       Email : user.Email,
                       ClientID : user.ClientID
                    }
                })
            }
            catch(myError){
                console.log("error setting user token", myError);
                res.status(500).send()
            }
})




app.get("/workoutType", (req,res)=>{
        //get data from db
         db.executeQuery(`SELECT*From WorkoutTypeTBL
          `)
        .then((result)=> {
             res.status(200).send(result)
           }) 
         .catch((err)=>{
             console.log(err);
             res.status(500).send()
         })
     })

     app.get("/workoutType/:pk", (req,res)=>{
           var pk= req.params.pk
             //console.log("my pk: ", pk) 
           var myQuery= `SELECT*From WorkoutTypeTBL
             
             Where WorkoutTypeTBL.WorkoutTypeID =  ${pk}`
        
             db.executeQuery(myQuery)
                .then((workoutType) => {
                     //console.log("Workout Type: " + workoutType)
                     if(workoutType[0]){
                         res.send(workoutType[0])
                     }
                     else{
                         res.status(404).send('bad request')
                     }
                 })
                 .catch((err)=>{
                     console.log("error in workoutType/pk", err)
                     res.status(500).send()
                 })
         })     


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {console.log(`app is running on port ${PORT}`)})
