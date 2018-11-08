function collidesWith(a, b){ //a is moving, b is static
   var res = {};
   if(a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y){
         var acx = a.x+a.width/2;
         var acy = a.y+a.height/2;
         res.dir = findDir({x:acx, y:acy}, b);
         res.col = true;
   }else{
      res.col = false;
   }
   return res;
}

function findDir(a, b){
   var isAbovePos = aboveLine(a, {x: b.x, y: (b.y+b.height)}, {x: (b.x+b.width), y: b.y});
   var isAboveNeg = aboveLine(a, {x: b.x, y: b.y}, {x: (b.x+b.width), y: (b.y+b.height)});

   if(isAboveNeg){
      if(isAbovePos){
         return 0;
         //top
      }else{
         return 1;
         //right
      }
   }else{
      if(isAbovePos){
         return 3;
         //left
      }else{
         return 2;
         //bot
      }
   }
}

function aboveLine(a, c1, c2){
   return ((c2.x-c1.x)*(a.y-c1.y)-(c2.y-c1.y)*(a.x-c1.x))>0;
}
