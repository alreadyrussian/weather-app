var express = require("express");
var app = express();
var request = require("request");


app.set("view engine", "ejs");
// per caricare dal server la cartella public dove ho inserito il mio css
app.use(express.static("public"));

// RESTFUL ROUTE
// ----- INDEX

app.get("/",function(req, res){
    res.render("index");
})


// ----- SHOW

app.get("/citta",function(req,res){
    var searchCity = req.query.search;
    var url = "http://api.openweathermap.org/data/2.5/forecast?q="+searchCity+"&units=metric&APPID=14e7c52b46944bf5b2150d4a5af29d6e";
    request(url, function(err,response, body){
        if(!err && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log(data.list[0].weather[0].icon);
            res.render("showcity", {dataejs:data});
        } else {
            res.render("404");
        }
    });
    
});


app.listen(4000, function(){
    console.log("Server working");
})