var cnv;
var players = [];
var localPlayer;
var world = [];
var gravity = 1;
var xhair;
var allset = false;
function setup(){
   cnv = createCanvas(window.innerWidth, window.innerHeight);
   players.push(Player({
      x: 300,
      y: 200,
      color: color(158,0,49),
      equipped: Weapon({

      })
   }));
   localPlayer = players[0];
   xhair = XHair({
      p: players[0]
   });
   addWorldObject(100,400,400,50,color(255, 199, 0));
   addWorldObject(400,300,400,50,color(255, 199, 0));
   addWorldObject(50,100,50,400,color(255, 199, 0));
   addWorldObject(800,100,50,400,color(255, 199, 0));
   addWorldObject(50,500,800,30,color(255, 199, 0));
   allset = true;
}

var FPS = 60;
setInterval(function() {
  gameLoop();
}, 1000/FPS);

function gameLoop(){
   recenterCanvas();
   update();
   repaint();
}

function update(){
   if(allset){
      players.forEach(p => {
         p.update();
      });
      xhair.update();
   }
}

function addWorldObject(x, y, w, h, c){
   world.push(WorldObject({
      x,
      y,
      width: w,
      height: h,
      color: c
   }));
}

function recenterCanvas(){
   var x = (window.innerWidth - width) / 2;
   var y = (window.innerHeight - height) / 2;
   cnv.position(x, y);
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
   rect(52, window.innerHeight-48, 96*localPlayer.health/100, 16);

}

function mousePressed(){
   localPlayer.mousePressed();
}
function mouseReleased(){
   localPlayer.mouseReleased();
}
