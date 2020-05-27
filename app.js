var express = require('express');
var request = require('request');
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.entity;
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});
        
app.listen(4000, function(){
    console.log("Wiki has started searching!!");
});