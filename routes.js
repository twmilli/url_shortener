var express = require("express");
var router = express.Router();
var queries = require("./queries.js");

router.get('/favicon.ico', function(req, res) {
    res.sendStatus(200);
});

router.get("/", function(req, res){
    res.sendFile('index.html');
});

router.get("/new/:url(*)", queries.createUrl);

router.get('/:tag(*)', queries.redirect);

module.exports = router;