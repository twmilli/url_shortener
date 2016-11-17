var express = require("express");
var mongo = require("mongodb").MongoClient;
var router = require('./routes.js');

var url = process.env.MONGODB_URI;
var app = express();

console.log(url);

app.use(express.static(__dirname + '/View'));
app.use(express.static(__dirname + '/Script'));
app.set('port', (process.env.PORT || 8080));

mongo.connect(url, function(err,db){
    if (err){
        throw err;
    }
    app.use(function(req,res,next){
        req.db = db;
        next();
    }).use(router);
});

app.listen(app.get('port'), function(){
    console.log("listening on port " + app.get('port'));
});