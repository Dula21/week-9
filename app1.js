var express = require("express");
var app= express();
app.get("/", function(req, res){
    res.send("You just sent a GET request,friend");

});
app.post("/", function(req, res){
    res.send("You just sent a POST request,friend");

});
app.put("/", function(req, res){
    res.send("I dont see a lof og PUT request anymore");

});
app.delete("/", function(req, res){
    res.send("Oh my, a DELETE??");

});
app.listen(3000,function(){
    console.log("Crud is running on port 3000");
});
