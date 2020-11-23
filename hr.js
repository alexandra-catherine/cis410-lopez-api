var frontEnd = 1;
 var backEnd = 2;


function calcWeeklyPay(workerType, hours){
    var pay;
    var rate;
    var overtime = 0;


    if (workerType == 1){
        rate = 55;
        }
    if (workerType == 2) {
        rate = 60;
        }
    if (hours > 40){
        overtime = (hours - 40);
        hours = 40;
    }

    pay = (rate * hours) + ((rate * 2)*overtime);
    return "“Your pay this week is " + pay 
    }

 console.log(calcWeeklyPay())


 module.exports=calcWeeklyPay;
 console.log(module)