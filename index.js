const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
// Json parser Middleware to parse Json data of req.body
app.use(express.json());

// Using localData base 
const users = [];

app.post("/signup", function (req, res) {
    const { username , password } = req.body;

    users.push({
        username , 
        password
    })    

    res.json({
        message: "You are signed up"
    })

   // console.log(users)
    
})

app.post("/signin", function(req, res) {

    const { username , password } = req.body;

    // maps and filter
    let foundUser = null;

    for (let i = 0; i<users.length; i++) {
        if (users[i].username == username && users[i].password === password) {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        //console.log("\n",foundUser.username);

        // Signing username and password with secret key
        const token = jwt.sign({
            username ,
            password , 
        }, process.env.JWT_AUTH_SECRET, {noTimestamp : true}) ;

        // foundUser.token = token;
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})

app.get("/me", function(req, res) {
    
    const token = req.headers.token 
    try{
        const decoded = jwt.verify(token , process.env.JWT_AUTH_SECRET); 
        console.log("decoded" , decoded);

        const username = decoded.username;
        let UserFound = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username)  {
                UserFound = users[i]
            }
        }

        if (UserFound) {
            res.status(200).json({
                username : UserFound.username,
                password : UserFound.password
            })
        } 
    }
    catch(e){
        res.status(403).json({
            error : "Invalid Token ! Please sign-in again"
        });
    }
})


app.listen(3000);// that the http server is listening on port 3000