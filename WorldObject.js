function WorldObject(I) {
   I.draw = function() {
      strokeWeight(1);
      stroke(this.color);
      fill(color(48,49,52));
      rect(this.x, this.y, this.width, this.height);
   };
  return I;
}
