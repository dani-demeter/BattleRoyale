function Player(I) {
   I.xv = 0;
   I.yv = 0;
   I.xc = 0;
   I.yc = 0;
   I.nx = I.core.x;
   I.ny = I.core.y;
   I.maxv = 20;
   I.grounded = false;
   I.jumpV = 15;
   I.horiV = 5;
   I.jumpsLeft = 1;
   I.maxjumpsleft = 1;
   I.spacedown = false;
   I.projectiles = [];
   I.r = 2+Math.sqrt(I.core.width*I.core.width+I.core.height*I.core.height)/2;
   I.draw = function() {
      noStroke();
      fill(I.core.color);
      rect(I.core.x, I.core.y, I.core.width, I.core.height);
      I.projectiles.forEach(p => {
         p.draw();
      });
   };

   I.update = function() {
      I.core.y = I.ny;
      I.core.x = I.nx;
      pups.forEach(pup => {
         if(simpleCollidesWith(I.core, pup)){
            pup.pick(I);
         }
      });

      if(I.yv+gravity<I.maxv){
         I.yv += gravity;
      }
      if(keyIsDown(65)){
         I.nx = I.core.x - I.horiV;
      }else if(keyIsDown(68)){
         I.nx = I.core.x + I.horiV;
      }
      if(keyIsDown(32)){
         if(!I.spacedown){
            I.spacedown = true;
            if(I.grounded){
               I.yv = -I.jumpV;
               I.grounded = false;
            }else if(I.jumpsLeft>0){
               I.jumpsLeft -= 1;
               I.yv = -I.jumpV;
               I.grounded = false;
            }
         }
      }else{
         I.spacedown = false;
      }
      constrain(I.yv, -I.maxv, I.maxv);
      I.ny = I.core.y + I.yv;

      var collisions = [];
      var needGravity = true;
      world.forEach(w => {
         var c = collidesWith({x: I.nx, y: I.ny, width: I.core.width, height: I.core.height}, w)
         if(c.col){
            c.obj = w;
            collisions.push(c);
         }
      });
      if(collisions.length>0){
         collisions.forEach(c => {
            if(c.dir==2){ //top
               I.ny = c.obj.y - I.core.height;
               I.yv = 0;
               I.grounded = true;
               I.jumpsLeft = I.maxjumpsleft;
            }else if(c.dir==3){ // right
               I.nx = c.obj.x + c.obj.width;
            }else if(c.dir==0){ // bot
               I.ny = c.obj.y + c.obj.height;
               I.yv = 0;
            }else{ //left
               I.nx = c.obj.x - I.core.width;
            }
         });
      }else{
         I.grounded = false;
      }
      I.xc = I.core.x + I.core.width/2.0;
      I.yc = I.core.y + I.core.height/2.0;
      I.projectiles.forEach(p => {
         p.update();
      });
      weapons[I.core.equipped].update();
   };

   I.removeProjectile = function(p){
      for(var i = 0; i < I.projectiles.length; i++){
         if (I.projectiles[i] == p) {
           I.projectiles.splice(i, 1);
         }
      }
   }

   I.mousePressed = function(){
      var w = weapons[I.core.equipped];
      if(w.lastfired+w.reload*1000<millis()){
         w.windup(millis());
      }
   };

   I.mouseReleased = function(){
      I.shoot();
   };

   I.shoot = function(){
      var w = weapons[I.core.equipped];
      if(w.winding){
         var dmg = 0;
         dmg = w.shoot(millis());
         I.projectiles.push(Projectile({
            xc: I.xc-xhair.uv[0]*I.r,
            yc: I.yc-xhair.uv[1]*I.r,
            speed: w.speed,
            dmg
         }));
      }
   }

  return I;
}
