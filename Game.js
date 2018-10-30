var cnv;
var players = [];
var world = [];
var gravity = 1;

function setup(){
   cnv = createCanvas(window.innerWidth, window.innerHeight);
   players.push(Player({
      x: 300,
      y: 200,
      color: color(158,0,49)
   }));
   world.push(WorldObject({
      x: 100,
      y: 400,
      width: 400,
      height: 20,
      color: color(255, 199, 0)
   }));
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
