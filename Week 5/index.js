const express = require ('express');
const app = express();

app.get('/sign', function(req, res){
        res.sendFile(__dirname + "/Week 5/Zero1.html")
});


app.listen(8080);