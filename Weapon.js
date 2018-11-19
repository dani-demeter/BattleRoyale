function Weapon(I) {
   // I.width = 4;
   // I.height = 4;
   I.windstart = 0;
   I.mindmg = 5;
   I.maxdmg = 25;
   I.windupl = 2;
   I.lastfired = -1000;
   I.lll = -1000;
   I.lastshot = -1000;
   I.reload = 1;
   I.winding = false;
   I.maxwound = false;
   I.maxwoundat = 0;
   I.maxholdtime = 1;

   I.windup = function(wtime) {
      I.winding = true;
      I.windstart = wtime;
   }

   I.pdone = function(){
      if(I.winding){
         if(I.maxwound){
            return 1;
         }else{
            var p = (millis()-I.windstart)/(1000*I.windupl);
            if(p>=1){
               I.maxwound = true;
               I.maxwoundat = millis();
            }
            return p;
         }
      }else{
         return (1000*I.reload-millis()+I.lastfired)/(1000*I.reload);
      }
   }

   I.shoot = function(stime){
      I.maxwound = false;
      I.lastfired = stime;
      I.winding = false;
      var pw = (I.lastfired-I.windstart)/(1000*I.windupl);
      var dmg = Math.floor((I.maxdmg-I.mindmg)*pw)+I.mindmg;
      return dmg;
   }

   I.update = function(){
      if(I.winding && I.maxwound){
         if(I.maxwoundat+I.maxholdtime*1000<millis()){
            localPlayer.shoot();
         }
      }
   }

   return I;
}
