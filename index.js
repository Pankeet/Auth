const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = "Pankeetisgreat";
// Local Database
const user = [];

app.use(express.json());

// SIGNUP
app.post('/signup', function(req,res){
        const username = req.body.username;
        const password = req.body.password;
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
    }
        res.send("You have signed up! 🍾");
})

// SIGNIN
app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    let foundi = null;

    for(let i=0;i<user.length;i++){
        if(user[i].username == username && user[i].password == password){
           
            foundi = user[i];
        }
        }
        if(foundi){
        const token = jwt.sign({
            username : foundi.username
        }, JWT_SECRET);

        foundi.token = token;

        res.json({
            token : token
            })
        }
        else{
            res.status(403).send({
                message: "Invalid Token"
            })
    }
    console.log(user);
})

// ME endpoint
app.get('/me', function (req, res) {
    const token = req.headers.token;

    try {
        // Verify token
        const foundme = jwt.verify(token, JWT_SECRET);
        const usern = foundme.username;

        // Find the user
        for (let i = 0; i < user.length; i++) {
            if (user[i].username === usern) {
                return res.json({
                    Username: usern
                });
            }
        }

        // If no user is found
        res.status(401).send("Invalid Token");
    } catch (error) {
        // Handle invalid token or verification errors
        res.status(401).send("Invalid Token");
    }
});

app.listen(3000);  