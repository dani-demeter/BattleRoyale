function Projectile(I) {
   I.width = 3*Math.ceil(6.0*I.dmg/25);
   I.height = 3*Math.ceil(6.0*I.dmg/25);
   I.vx = xhair.uv[0]*I.speed;
   I.vy = xhair.uv[1]*I.speed;
   I.mycolor = color(10*I.dmg, 50, 0);
   I.draw = function() {
      strokeWeight(2);
      stroke(I.mycolor);
      noFill();
      ellipse(I.xc, I.yc, I.width, I.height);
   };

   I.update = function() {
      I.xc -= I.vx;
      I.yc -= I.vy;
      world.forEach(w => {
         if(simpleCollidesWith({x: I.xc-I.width/2, y: I.yc-I.height/2, width: I.width, height: I.height}, w)){
            localPlayer.removeProjectile(I);
         }
      });
   };

   return I;
}
