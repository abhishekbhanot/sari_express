


// //api through header
// const express = require("express");

// const app = express();
// const port = 3000;


// const addition = (num1,num2) => {
//     return Number(num1) +Number(num2); 
// };

// app.get("/", (req, res) => {
//     let first = req.headers.num1;
//     let second = req.headers.num2;

//     let result = `Addition is: ${addition(first,second)}`;
//     res.send(result);
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });




// //using body now
// const express = require("express");
// const bodyParser=require("body-parser");


// const app = express();
// // explaining body to pass values
// const middleware = (req, res, next) => {
//   console.log("from inside middleware");
//   next();
// };

// app.use(middleware);
// app.use(bodyParser.json());
// const port = 3000;


// const addition = (num1) => {
//     return Number(num1) ; 
// };

// app.post("/", (req, res) => {
//     // let first = req.headers.num1;
//     // let second = req.headers.num2;
//     console.log("body is", req.body);

//     let result = `Addition is: ${addition(req.body.first)}`;
//     res.send(result);
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

//header practice best code 

// const express= require("express");

// const app=express();
// const port=3000;

// const add = (first, second) => {
//     return first + " " + second; // Concatenating names with a space
// };
// app.get("/",(req,res)=>{
//     let first1=req.headers.first;
//     let second2=req.headers.second;
//     let result=`hello my name is ${add(first1,second2)}`;
//     res.send(result);
// })

// //start app
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`)
// })



//body practice 
// const express = require("express");
// const bodyParser=require("body-parser");


// const app = express();
// // explaining body to pass values
// const middleware = (req, res, next) => {
//   console.log("from inside middleware");
//   next();
// };

// app.use(middleware);
// app.use(bodyParser.json());
// const port = 3000;


// const addition = (num1) => {
//     return Number(num1) ; 
// };

// app.post("/", (req, res) => {
//     // let first = req.headers.num1;
//     // let second = req.headers.num2;
//     console.log("body is", req.body);

//     let result = `Addition is: ${addition(req.body.first)}`;
//     res.send(result);
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


//calculator in express

// const express = require("express");


// const app = express();
// const port = 3000;

// // Calculator function
// const calculate = (num1, num2, operation) => {
//     switch (operation) {
//         case "add":
//             return num1 + num2;
//         case "sub":
//             return num1 - num2;
//         case "mul":
//             return num1 * num2;
//         case "divide":
//             return num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
//         default:
//             return "Invalid operation. Use add, subtract, multiply, or divide.";
//     }
// };


// app.get("/", (req, res) => {
//     let num1 = Number(req.headers.num1);
//     let num2 = Number(req.headers.num2);
//     let operation = req.headers.operation;
//     let result = calculate(num1, num2, operation);
//     res.send(`Result: ${result}`);
// });


// app.listen(port, () => {
//     console.log(`server  is wroking on ${port}`);
// });

//backend for the sari project
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const port = 3000;

const vitals = (weight, heightInInches, dob, gender, activityLevel,goal,weightgoal) => {

    let birthDate = new Date(dob);

    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    let heightInMeters = heightInInches * 0.0254;  
    let heightInCm = heightInInches * 2.54;
    let bmi = weight / (heightInMeters ** 2);
  

    let bmr ;
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * heightInCm - 5 * age + 5;
        } else if (gender === "female") {
            bmr = 10 * weight + 6.25 * heightInCm - 5 * age - 161;
        } else {
            bmr = "Invalid gender";
        }
        //tdee
        let tdee;
    switch (activityLevel) {
        case "verylow":
            tdee = bmr * 1.2;
             break;
        case "low":
            tdee = bmr * 1.375;
            break;
        case "moderate":
            tdee = bmr * 1.55;
            break;
        case "active":
            tdee = bmr * 1.725;
             break;
        case "superactive":
            tdee = bmr * 1.9;
            break;
        default:
                tdee = "Invalid activity level";
        }
        //goal
          let aim;
        
          
        switch(goal){
            
                
            case "weight_loss":
                aim = tdee - 1000;
                

                break;
           
            case "weight_gain":
                aim = tdee + 1000;
                break;
        }

        //days to cal how many it takes to reduce the weight
        if(goal=="weight_loss"){
            let finalweight=weight-weightgoal;
            let weeks=finalweight/1;
             days=weeks*7;
        }
        else if(goal=="weight_gain"){
            let finalweight=weightgoal-weight;
            let weeks=finalweight/1;
             days=weeks*7;
        }

        
    

    return { bmi, bmr,age, tdee ,aim,days};
};

app.post("/vitals", (req, res) => {
    const { weight, height, dob, gender,activityLevel,goal,weightgoal } = req.body;
    let result = vitals(weight, height, dob, gender,activityLevel,goal,weightgoal);
    res.send(result);

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
