function WorldObject(I) {
  // I.inBounds = function() {
  //   return I.x >= 0 && I.x <= CANVAS_WIDTH &&
  //     I.y >= 0 && I.y <= CANVAS_HEIGHT;
  // };

   I.draw = function() {
      strokeWeight(1);
      stroke(this.color);
      // fill(color(245,240, 246));
      rect(this.x, this.y, this.width, this.height);
   };

   I.update = function() {

   };

  return I;
}
