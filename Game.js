var cnv;
var players = [];
var world = [];
var gravity = 3;

function setup(){
   cnv = createCanvas(window.innerWidth, window.innerHeight);
   players.push(Player({
      x: 300,
      y: 200,
      color: color(158,0,49)
   }));
   addWorldObject(100,400,400,50,color(255, 199, 0));
   addWorldObject(400,300,400,50,color(255, 199, 0));
   addWorldObject(50,100,50,400,color(255, 199, 0));
   addWorldObject(800,100,50,400,color(255, 199, 0));
   addWorldObject(50,500,800,30,color(255, 199, 0));
}

var FPS = 30;
setInterval(function() {
  gameLoop();
}, 1000/FPS);

function gameLoop(){
   recenterCanvas();
   update();
   repaint();
}

function update(){
   players.forEach(p => {
      p.update();
   });
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
   world.forEach(o => {
      o.draw();
   });
   players.forEach(p => {
      p.draw();
   });
}
