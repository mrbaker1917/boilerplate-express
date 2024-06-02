require('dotenv').config();
let express = require('express');
let app = express();

// Normal usage
// app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

absolutePath = __dirname + "/views/index.html";
app.get('/' , (req, res) => {
    res.sendFile(absolutePath);
});

app.get('/json' , (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = "Hello json".toUpperCase();
    } else {
        response = "Hello json";
    }
    res.json({"message": response});
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({time: req.time});
});








 module.exports = app;
