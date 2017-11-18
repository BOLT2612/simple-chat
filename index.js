var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var messageList = [];

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/simple-chat.html");
  //res.send("<p>/chatClient.html</p>");
});

app.get('/update-msgs-list', function(req, res){
  messageList = messageList.slice(0,20);
  res.send(JSON.stringify(messageList));
});

app.post('/cName', function(req, res){
  messageList = messageList.slice(0,20);
  var newMsg = req.body.cName + ': ' + req.body.msg2server;
  messageList.unshift(newMsg);
  messageList = messageList.slice(0,20);
  res.send(JSON.stringify(messageList));
});

app.listen(3000, function(){
  console.log("Server \"simple-chat\" Running");
})