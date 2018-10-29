function Player(I) {
  I.xVelocity = 0;
  I.yVelocity = 0;
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
      if(keyIsDown(LEFT_ARROW)){
         this.x -= 5;
      }else if(keyIsDown(RIGHT_ARROW)){
         this.x += 5;
      }
   };

  return I;
}
