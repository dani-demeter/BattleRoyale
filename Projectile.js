function Projectile(I) {
   I.width = 6*Math.ceil(I.dmg/25);
   I.height = 6*Math.ceil(I.dmg/25);
   I.speed = 6;
   I.vx = xhair.uv[0]*I.speed;
   I.vy = xhair.uv[1]*I.speed;
   I.mycolor = color(10*I.dmg, 50, 100);
   I.draw = function() {
      strokeWeight(2);
      stroke(I.mycolor);
      noFill();
      ellipse(I.xc, I.yc, I.width, I.height);
   };

   I.update = function() {
      I.xc -= I.vx;
      I.yc -= I.vy;
   };

   return I;
}
