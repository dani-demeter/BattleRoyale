function Player(I) {
  I.xv = 0;
  I.yv = 0;
  I.width = 30;
  I.height = 30;

  // I.inBounds = function() {
  //   return I.x >= 0 && I.x <= CANVAS_WIDTH &&
  //     I.y >= 0 && I.y <= CANVAS_HEIGHT;
  // };

   I.draw = function() {
      strokeWeight(2);
      stroke(this.color);
      rect(this.x, this.y, this.width, this.height);
   };

   I.update = function() {
      var collision = {};
      world.forEach(w => {
         var c = collidesWith(I, w)
         if(c.col){
            collision = c;
            collision.obj = w;
         }
      });
      if(!collision.col){
         this.yv += gravity;
      }else{
         if(collision.dir==2){
            this.y = collision.obj.y-this.height;
         }
         this.yv = 0;
      }
      this.y += this.yv;
      if(keyIsDown(LEFT_ARROW)){
         this.x -= 1;
      }else if(keyIsDown(RIGHT_ARROW)){
         this.x += 1;
      }
   };

  return I;
}
