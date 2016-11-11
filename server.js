var express = require("express");
var helper = require("./helper.js");
var mongo = require("mongodb").MongoClient;
var url = process.env.MONGOLAB_URI;
var app = express();

var LENGTH = 6;

app.use(express.static(__dirname + '/View'));
app.use(express.static(__dirname + '/Script'));
app.set('port', (process.env.PORT || 8080));

app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

app.get("/", function(req, res){
    res.sendFile('index.html');
});

app.get("/new/:url(*)", function(req,res){
    var user_url = req.params.url;
    
    var obj = helper.encode(user_url);
    
    mongo.connect(url, function(err, db){
        if (err) throw err;
        db.collection("urls")
        .update(
            {key: obj.key}, obj, {upsert: true});
        db.close();
        var short_url = (req.protocol + '://' + req.headers.host +'/' + obj.key);
        res.json(
        {original_url: user_url,
        short_url: short_url});
        });
});

app.get('/:tag(*)', function(req,res){
    mongo.connect(url, function(err, db){
        if (err) throw err;
        var tag = req.params.tag;
        db.collection("urls")
        .find({
            key: tag
        }).toArray(function(err,data){
            if (err) throw err;
            console.log(data);
            var curr_url = data[0]["url"];
            //console.log(curr_url);
            res.redirect(curr_url);
            db.close();
        });
    })
});


app.listen(app.get('port'), function(){
    console.log("listening on port " + app.get('port'));
});