var element = function(id){
  return document.getElementById(id);
};

var cName = element("clientName");
var cMsg = element("clientMsg");
var msgList = element("messageList");
var sButton = element("sendButton");

cMsg.addEventListener("keydown", function(event){
  //event.preventDefault();
  if (event.keyCode === 13) {
    sendNewMessage();
  }
});

var sendNewMessage = function() {
  var data2Send = {
    'cName' : cName.value,
    'msg2server' : cMsg.value
  }
  console.log("invoked! data2send = " + JSON.stringify(data2Send));
  fetch('http://localhost:3000/cName', 
    { 
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data2Send)
    }).then( function(res) {
      if (res.ok) return res.json();
      throw new Error("fetch post had a problem")
    }
  ).then( function(resJSON) {
    var msgLine, newText;
    var forDisposal = document.getElementsByClassName('mline');
    while(forDisposal[0] != null) {
      msgList.removeChild(forDisposal[0]);
    }
    resJSON.forEach((x) => {
      msgLine = document.createElement("li");
      msgLine.setAttribute("class", "mline");
      newText = document.createTextNode(x);
      msgLine.appendChild(newText);
      msgList.appendChild(msgLine);
      });
  }).catch(function() {
    console.log("Catching error: fetch post had a problem");
  });
};

var updateMessageList = function() {
  fetch('http://localhost:3000/update-msgs-list',
    {
      method: 'GET',
      headers: { 'Accept': 'application/json, text/plain, */*' }
    }).then( (response) => {
    if (response.ok) return (response.json());
    throw new Error("updateMessageList(): fetch had a problem");
  }).then( (resJSON) => {
    var msgLine, newText;
    var forDisposal = document.getElementsByClassName('mline');
    while(forDisposal[0] != null) {
      msgList.removeChild(forDisposal[0]);
    }
    resJSON.forEach((x) => {
      msgLine = document.createElement("li");
      msgLine.setAttribute("class", "mline");
      newText = document.createTextNode(x);
      msgLine.appendChild(newText);
      msgList.appendChild(msgLine);
      });
  }).catch(function() {
    console.log("updateMessageList(): Catching error: fetch GET  had a problem");
  });
};

setInterval(updateMessageList, 5000);

