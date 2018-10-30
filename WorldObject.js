function WorldObject(I) {
  // I.inBounds = function() {
  //   return I.x >= 0 && I.x <= CANVAS_WIDTH &&
  //     I.y >= 0 && I.y <= CANVAS_HEIGHT;
  // };

   I.draw = function() {
      strokeWeight(3);
      stroke(this.color);
      rect(this.x, this.y, this.width, this.height);
   };

   I.update = function() {

   };

  return I;
}
