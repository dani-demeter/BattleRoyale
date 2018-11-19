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
      ellipse(I.xc, I.yc, 2*I.r);
      fill(color(255, 0,0));
      noStroke();
      ellipse(I.xc, I.yc, constrain(2*(I.p.core.equipped.pdone()*I.r), 0, 2*I.r));
   };

   I.update = function() {
      var v = [I.p.xc-mouseX, I.p.yc-mouseY];
      var IvI = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
      I.uv = [v[0]/IvI, v[1]/IvI];
      I.xc = I.p.xc-I.uv[0]*I.dist;
      I.yc = I.p.yc-I.uv[1]*I.dist;
   };

  return I;
}
