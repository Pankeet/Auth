const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = "AuthUSingJwt";
// Currently using Local Database
let user = [];

app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
})
// Middleware for authentication
function auth(req, res, next){
        const token = req.headers.token;
        const decodedtoken = jwt.verify(token, JWT_SECRET);
        if(decodedtoken.username){  
                req.username = decodedtoken.username;
                console.log("verified user "+decodedtoken.username);
                next();
        }
        else{
            res.send("You are not logged in ! Please log in again");
        }
}

function logger(req,res, next){
    console.log(req.method +" req came!");
    next();
}
// SIGNUP
app.post('/signup', logger, function(req,res){
        const username = req.body.username;
        const password = req.body.password;
        // Check if the user already exsists
        let b = true ;
        for(let i=0;i<user.length;i++){
            if(user[i].username == username){
                res.send("User Already Exsists");
                b = false;
            }
        }
        if(b){
        user.push({
            username : username,
            password : password
        })
        console.log(user)
    }
        res.send("You have signed up! 🍾");
})

// SIGNIN
app.post("/signin", logger , function(req, res){
    const username = req.body.username;
    const password =  req.body.password;
    let foundi = null;
    for(let i=0;i<user.length;i++){  
        if (user[i].username.trim() === username.trim() && user[i].password.trim() === password.trim()) {
            foundi = user[i];
            break;
        }
        }

        if(foundi){
        const token = jwt.sign({
            username : foundi.username
        }, JWT_SECRET);

        foundi.token = token;
        console.log(token)

        res.json({
            token : token
            })
        } 
        else{
            res.status(403).send("Invalid Token");
    }
  
})

// ME endpoint
app.get('/me', logger, auth ,function (req, res) {

        for (let i = 0; i < user.length; i++) {
            if (user[i].username === req.username) {
                return res.json({
                    Username : req.username
                });
            }
        }

        // If no user is found
        res.status(401).send("Invalid Token");
    });
 
app.listen(8080);   