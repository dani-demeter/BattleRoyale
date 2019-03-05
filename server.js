
// if a directory needs to be served
const path = require('path');
// for webserver
const express = require('express');
// parse POST data uploaded from client
const parser = require('body-parser');
// for cross origin requests
const cors = require('cors');

const fs = require('fs');
// express web server
const app = express();
// required so we can have a socket server alongside webserver
const server = require('http').Server(app);
// websocket server running on the same port as http
const io = require('socket.io')(server);

var PpL = 1;
var queue = [];

var db = {};
var playersdb = {};

var lobbies = [];

maps = [];
maps[0] = [{x:100,y:400,w:400,h:50},{x:400,y:300,w:400,h:50},{x:800,y:100,w:50,h:400},{x:50,y:500,w:800,h:30}];


// towrite = {
//    hello: {
//       pass: "thisisahash",
//       r: 255,
//       g: 125,
//       b: 100
//    }
// }
// fs.writeFile('serverdb.txt', JSON.stringify(towrite), function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

fs.readFile('serverdb.txt', function(err, data) {
   db = JSON.parse(data);
});

server.listen(process.env.PORT || 5000);
app.use(express.static(__dirname));

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// app.use(express.static(path.resolve(__dirname))))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/Welcome.html'));
});
app.get('/play', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/Game.html'));
});

app.post('/register', function (req, res) {
   console.log("trying to register", req.body.usr, req.body.pass);
   var resu = tryRegister(req.body.usr, req.body.pass, req.body.color);
   res.send({status: resu});
});

app.post('/login', function (req, res) {
   console.log("trying to login", req.body.usr, req.body.pass);
   var resu = tryLogin(req.body.usr, req.body.pass);
   console.log(db[req.body.usr]);
   res.send({status: resu, color: db[req.body.usr].color});
});

app.post('/setColor', function (req, res) {
   var jsonreq = JSON.parse(req.body);
   setColorFor(jsonreq.usr, jsonreq.color);
   res.send({status: 13});
});

app.post('/enqueue', function (req, res) {
   queue.push(req.body.usr);
   var resu = 13;
   if(queue.length==PpL){
      resu = 14;
      var i = nextOpenLobby();
      if(i!=-1){
         lobbies[i].empty = false;
         lobbies[i].players = queue;
      }else{
         lobbies.push({
            empty: false,
            players: queue
         });
         i = lobbies.length-1;
      }
      for(var j = 0; j<queue.length; j++){
         db[queue[j]].currentLobby = i;
         playersdb[queue[j]] = {
            x: 300,
            y: 200
         }
      }
      console.log("playersdb ", playersdb);
      queue = [];
   }
   console.log("lobbies: ", lobbies);
   res.send({status: resu});
});

function nextOpenLobby(){
   for(var i = 0; i<lobbies.length; i++){
      if(lobbies[i].empty){
         return i;
      }
   }
   return -1;
}

io.on('connection', function(socket) {
  socket.emit('connected', 'Connected to server!');
  socket.on('connected', (data) => {
     console.log("yES HELLO");
     console.log(socket);
  });
  // how the server responds when the client sends a message
   socket.on('message', function(data) {
      console.log("socket received", data);
      // io.emit sends the event (message) and data to ALL socket connections
      // ie other clients
      if(data.request!==undefined){
         var usr = data.user;
         var passw = data.pass;
         if(data.request == "update"){
            if ((usr in db) && passw == db[usr].password){
               if(data.inputs.right){
                  playersdb[usr].x += 5;
               }
               if(data.inputs.left){
                  playersdb[usr].x -= 5;
               }
            }
            console.log(data.inputs);
            io.emit('message', {msg: 'xupdate', tox:playersdb[usr].x});
         }
         //console.log("client requested", data.request, "with hexC", data.hexC);
         // if(data.request === "getMap"){
         //    for(var i = 0; i<db.length; i++){
         //       if(db[i].hexCode === data.hexC){
         //          var toSend = {
         //             status: "success",
         //             request: data.request,
         //          };
         //          io.emit('message', toSend);
         //       }
         //    }
         // }else{
         //    console.log("data.request undefined");
         // }
         // io.emit('message', data);
         // just send a confirmation event back to client to signal receive
         socket.emit('confirmation', data);
      };
   });
   // what happens when a client disconnects, not sure what's the event emitted
   // usually diconnect, close, or exit
   socket.on('disconnect', (data) => {
      console.log(socket.client.conn.id);
      console.log("client disconnected");
   });
});

function tryLogin(usr, passw){
   if ((usr in db) && passw == db[usr].password){
      return 13;
   }else{
      return 1;
   }
}

function tryRegister(usr, pass, col){
   if(usr in db){
      console.log("already reg", usr)
      return 0;
   }else{
      console.log("registering", usr);
      registerNewUser(usr, pass, col);
      return 13;
   }
}

function registerNewUser(usr, pass, col){
   db[usr] = {
      password: pass,
      color: col
   };
   fs.writeFile('serverdb.txt', JSON.stringify(db), function (err) {
   if (err) throw err;
      console.log('Updated DB');
   });
}

function setColorFor(usr, col){
   db[usr].color = col;
}

function setPlayer(usr, player){
   console.log(player);
   // db.usr.player = player;
}
