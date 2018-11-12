function Weapon(I) {
   // I.width = 4;
   // I.height = 4;
   I.speed = 6;
   I.mindmg = 5;
   I.maxdmg = 25;
   I.windupl = 2;
   I.lastfired = 0;
   I.windstart = 0;
   I.reload = 1;
   I.winding = false;

   I.windup = function(wtime) {
      I.winding = true;
      I.windstart = wtime;
   }

   I.pdone = function(){
      if(I.winding){
         return (Date.now()-I.windstart)/(1000*I.windupl);
      }else{
         return (1000*I.reload-Date.now()+I.lastfired)/(1000*I.reload);
      }
   }

   I.shoot = function(stime){
      I.lastfired = stime;
      I.winding = false;
      var pw = (I.lastfired-I.windstart)/(1000*I.windupl);
      var dmg = Math.floor((I.maxdmg-I.mindmg)*pw)+I.mindmg;
      return dmg;
   }

   return I;
}
