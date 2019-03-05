var cnv;
var players = [];
var localPlayer;
var world = [];
var pups = [];
var gravity = 1;
var xhair;
var allset = false;
var username;
var password;
var weapons = {
   phaser: Weapon({
      speed: 2
   }),
   blaster: Weapon({
      speed: 6
   })
};
function setup(){
   var mycolor;
   username = readCookie("username");
   password = readCookie("password");
   if(username!=""){
      mycolor = color(parseInt(readCookie("r")), parseInt(readCookie("g")), parseInt(readCookie("b")));
      setupSocket();
      continueSetup(mycolor);
   }else{
      window.location = '/';
   }
}

function continueSetup(mycolor){
   cnv = createCanvas(window.innerWidth, window.innerHeight);
   localPlayer = Player({
      core: {
         x: 300,
         y: 200,
         width: 30,
         height: 30,
         color: mycolor,
         health: 50,
         equipped: "phaser"
      }
   });
   players.push(localPlayer);
   // httpPost("/setPlayer", {usr: "dd", pass: "pass", player: JSON.stringify(localPlayer.core)}, (res) => {
   //    // localPlayer.core = JSON.parse(res);
   //    // console.log(localPlayer.core);
   //    // console.log(localPlayer);
   // });
   xhair = XHair({
      p: localPlayer
   });
   socketSend()
   addWorldObject(100,400,400,50,color(255, 199, 0));
   addWorldObject(400,300,400,50,color(255, 199, 0));
   addWorldObject(50,100,50,400,color(255, 199, 0));
   addWorldObject(800,100,50,400,color(255, 199, 0));
   addWorldObject(50,500,800,30,color(255, 199, 0));
   addPup(150, 380, 20, 20);
   addPup(480, 280, 20, 20);
   allset = true;
}

var SPS = 60;
setInterval(function() {
  gameLoop();
}, 1000/SPS);

//----------------------------------------------------------------------//
//                          GAME UPDATE LOOP                            //
//----------------------------------------------------------------------//
var step = 0;
var movementInputs = {};
var haveInputs = false;
function gameLoop(){
   step = (step+1)%(3600);
   recenterCanvas();
   update();
   repaint();
   sendUpdate();
}

function sendUpdate(){
   if(haveInputs){
      socketSend({
         request: "update",
         user: username,
         pass: password,
         inputs: movementInputs
      });
      movementInputs = {};
      haveInputs = false;
   }
}

function update(){
   if(allset){
      localPlayer.update();
      xhair.update();
   }
}

function addWorldObject(x, y, w, h, c){
   world.push(WorldObject({
      x,
      y,
      width: w,
      height: h,
   }));
}

function addPup(x, y, w, h){
   pups.push(PickUp({
      x,
      y,
      width: w,
      height: h,
   }));
}

function recenterCanvas(){
   // var x = (window.innerWidth - width) / 2;
   // var y = (window.innerHeight - height) / 2;
   // cnv.position(x, y);
   cnv.position(0,0);
}

function drawBackground(){
   fill(28,29,32);
   strokeWeight(0);
   clear();
   rect(0,0,window.innerWidth, window.innerHeight);
}

function repaint(){
   drawBackground();
   if(allset){
      world.forEach(o => {
         o.draw();
      });
      pups.forEach(p => {
         p.draw();
      });
      players.forEach(p => {
         p.draw();
      });
      xhair.draw();
      drawHealth();
   }
}
function drawHealth(){
   noStroke();
   fill(color(245, 240, 246));
   rect(50, window.innerHeight-50, 100, 20);
   fill(color(245, 0,0));
   rect(52, window.innerHeight-48, 96*localPlayer.core.health/100, 16);
}

function mousePressed(){
   localPlayer.mousePressed();
}
function mouseReleased(){
   localPlayer.mouseReleased();
}

function onServerMessage(msg){
   if(msg.msg=='xupdate'){
      localPlayer.core.x = parseInt(msg.tox);
   }
   console.log(msg);
}

function readCookie(key){
   var cookies = document.cookie.split(";");
   for(var i = 0; i<cookies.length; i++){
      cookies[i] = cookies[i].trim();
      if(cookies[i].startsWith(key)){
         return(cookies[i].substring(key.length+1));
      }
   }
   return "";
}
