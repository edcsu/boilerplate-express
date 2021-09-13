var express = require('express');
var bodyParser = require('body-parser');
var app = express();

console.log("Hello world");

/*
app.get("/", (req, res) => {
  res.send("Hello Express");
});
*/

const indexPath = __dirname + "/views/index.html";
const staticPath = __dirname + "/public";

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());

app.use((req, res, next) =>{
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, res) => {
  res.sendfile(indexPath);
});

app.use("/public", express.static(staticPath));

app.get("/json", (req, res) => {
  var message =  {"message": "Hello json"};
const mySecret = process.env.MESSAGE_STYLE
  if(mySecret === "uppercase"
){
    message =  {"message": "HELLO JSON"};
  }
  res.json(message);
});


app.get('/now', (req, res, next) => {
  req.time = new Date().toString(); 
  next();
}, (req, res) => {
  res.json({time: req.time});
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word
  res.json({"echo": word});
});

app.get("/name", (req, res) => {
  const firstname  = req.query.first
  const lastname = req.query.last
  res.json({"name": `${firstname} ${lastname}`});
}).post("/name", (req, res) => {
  const firstname  = req.body.first
  const lastname = req.body.last
  res.json({"name": `${firstname} ${lastname}`});
});


 module.exports = app;
