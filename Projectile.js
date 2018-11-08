function Projectile(I) {
   I.width = 4;
   I.height = 4;
   I.speed = 5;
   I.vx = xhair.uv[0]*I.speed;
   I.vy = xhair.uv[1]*I.speed;
   I.draw = function() {
      strokeWeight(2);
      stroke(color((18,234,234)));
      noFill();
      ellipse(I.xc, I.yc, I.width, I.height);
   };

   I.update = function() {
      I.xc -= I.vx;
      I.yc -= I.vy;
   };

   return I;
}
