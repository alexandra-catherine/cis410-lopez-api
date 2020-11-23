const sql = require('mssql')
//const is a new way of doing var, but it is constant and doesnt change

//connect to DB
const config = {
    user: 'Alex',
    password: '694901Titan2118',
    server: 'cobazsqlcis410.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'acl21',
}

//Client TBL
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From ClientTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})


var myClients;

async function executeQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From ClientTBL`)

    console.log(result)

    myClients = result;
}

//executeQuery().then(()=>{console.log(myClients)});
//console.log("Here are my clients: " + myClients)

//workoutTBL
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From WorkoutTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var myWorkouts;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From WorkoutTBL`)

    console.log(result)

    myWorkouts = result;
}

//workout type tbl
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From WorkoutTypeTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var workoutType;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From WorkoutTypeTBL`)

    console.log(result)

    workoutType = result;
}

//inventoryTBL
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From InventoryTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var myInventory;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From InventoryTBL`)

    console.log(result)

    myInventory = result;
}

//trainerTBL
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From TrainerTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var myTrainer;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From TrainerTBL`)

    console.log(result)

    myTrainer = result;
}

//order tbl
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From OrderTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var myOrder;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From OrderTBL`)

    console.log(result)

    myOrder = result;
}

//product
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From ProductTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var myProduct;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From ProductTBL`)

    console.log(result)

    myProduct = result;
}

//order details tbl
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From OrderDetailsTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var myDetails;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From OrderDetailsTBL`)

    console.log(result)

    myDetails = result;
}

//progres TBL
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From Progress`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var myProgress;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From Progress`)

    console.log(result)

    myProgress = result;
}

//categoryTBL
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From CategoryTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var category;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From CategoryTBL`)

    console.log(result)

    category = result;
}

//supplier
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From SupplierTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var supplier;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From SupplierTBL`)

    console.log(result)

    supplier = result;
}

//Weight TBL
sql.connect(config)
    .then((myConnection)=>{
    return myConnection.query(`Select * From WeightTBL`)
    })
    .then((myResult)=>{console.log(myResult.recordset)})
    .catch((myError)=>{console.log("Something went wrong.", myError)})

    var weight;


async function workoutQuery(){
    var connection = await sql.connect(config)
    var result = await connection.query(`Select * From WeightTBL`)

    console.log(result)

    weight = result;
}


