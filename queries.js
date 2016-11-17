var helper = require("./helper.js");
var db;
var queries = {
    
    createUrl(req,res){
        var user_url = req.params.url;
        var obj = helper.encode(user_url);
        db = req.db;
        db.collection("urls")
        .update(
            {key: obj.key}, obj, {upsert: true});
        var short_url = (req.protocol + '://' + req.headers.host +'/' + obj.key);
        res.json(
        {original_url: user_url,
        short_url: short_url});
        },
    
    redirect(req,res){
        db = req.db;
        var tag = req.params.tag;
        db.collection("urls")
        .find({
            key: tag
        }).toArray(function(err,data){
            if (err) throw err;
            var curr_url = data[0]["url"];
            res.redirect(curr_url);
        });
    }
}

module.exports = queries;