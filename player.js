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
      var col = false;
      world.forEach(w => {
         if(collidesWith(I, w)){
            col = true;
         }
      });
      if(!col){
         this.yv += gravity;
      }else{
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
