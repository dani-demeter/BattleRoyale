function PickUp(I) {
   I.mycolor = color(50, 255, 60);
   I.draw = function() {
      noStroke();
      fill(I.mycolor);
      rect(I.x, I.y, I.width, I.height);
   };

   I.pick = function(p){
      p.health += 10;
      for(var i = 0; i<pups.length; i++){
         if(pups[i] == I){
            pups.splice(i, 1);
         }
      }
   }

   I.update = function() {

   };

   return I;
}
