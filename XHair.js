function XHair(I) {
   I.xc = 0;
   I.yc = 0;
   I.r = 10;
   I.dist = 100;
   I.uv = [];
   I.draw = function() {
      stroke(color(245,240,246));
      strokeWeight(1);
      noFill();
      ellipse(this.xc, this.yc, 2*this.r);
      fill(color(255, 0,0));
      noStroke();
      ellipse(this.xc, this.yc, constrain(2*(localPlayer.equipped.pdone()*I.r), 0, 2*I.r));
   };

   I.update = function() {
      var v = [this.p.xc-mouseX, this.p.yc-mouseY];
      var IvI = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
      this.uv = [v[0]/IvI, v[1]/IvI];
      this.xc = this.p.xc-this.uv[0]*this.dist;
      this.yc = this.p.yc-this.uv[1]*this.dist;
   };

  return I;
}
