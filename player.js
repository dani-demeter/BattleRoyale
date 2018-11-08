function Player(I) {
   I.xv = 0;
   I.yv = 0;
   I.xc = 0;
   I.yc = 0;
   I.nx = I.x;
   I.ny = I.y;
   I.width = 30;
   I.height = 30;
   I.maxv = 20;
   I.grounded = false;
   I.jumpV = 15;
   I.horiV = 5;
   I.jumpsLeft = 1;
   I.maxjumpsleft = 1;
   I.spacedown = false;
   I.vu = [];
   I.projectiles = [];

   I.draw = function() {
      strokeWeight(1);
      stroke(this.color);
      noFill();
      rect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach(p => {
         p.draw();
      });
   };

   I.update = function() {
      this.y = this.ny;
      this.x = this.nx;

      if(this.yv+gravity<this.maxv){
         this.yv += gravity;
      }
      if(keyIsDown(65)){
         this.nx = this.x - this.horiV;
      }else if(keyIsDown(68)){
         this.nx = this.x + this.horiV;
      }
      if(keyIsDown(32)){
         if(!this.spacedown){
            this.spacedown = true;
            if(this.grounded){
               this.yv = -this.jumpV;
               this.grounded = false;
            }else if(this.jumpsLeft>0){
               this.jumpsLeft -= 1;
               this.yv = -this.jumpV;
               this.grounded = false;
            }
         }
      }else{
         this.spacedown = false;
      }
      constrain(this.yv, -this.maxv, this.maxv);
      this.ny = this.y + this.yv;

      var collisions = [];
      var needGravity = true;
      world.forEach(w => {
         var c = collidesWith({x: this.nx, y: this.ny, width: this.width, height: this.height}, w)
         if(c.col){
            c.obj = w;
            collisions.push(c);
         }
      });
      if(collisions.length>0){
         collisions.forEach(c => {
            if(c.dir==2){ //top
               this.ny = c.obj.y - this.height;
               this.yv = 0;
               this.grounded = true;
               this.jumpsLeft = this.maxjumpsleft;
            }else if(c.dir==3){ // right
               this.nx = c.obj.x + c.obj.width;
            }else if(c.dir==0){ // bot
               this.ny = c.obj.y + c.obj.height;
               this.yv = 0;
            }else{ //left
               this.nx = c.obj.x - this.width;
            }
         });
      }else{
         this.grounded = false;
      }
      this.xc = this.x + this.width/2.0;
      this.yc = this.y + this.height/2.0;
      this.projectiles.forEach(p => {
         p.update();
      });
   };

   I.mousePressed = function(){
      this.projectiles.push(Projectile({
         xc: I.xc,
         yc: I.yc
      }));
   };

  return I;
}
