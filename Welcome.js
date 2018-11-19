var cnv;
var toPlay;
var loginButton;
var signupButton;
var defaultColor;
var logoutButton;
function setup(){
   cnv = createCanvas(window.innerWidth, window.innerHeight);
   defaultColor = color(28,29,32);
   background(defaultColor);

   loginButton = createButton("Log In");
   loginButton.position(100, 50);
   loginButton.size(75, 25);
   loginButton.mousePressed(login);

   signupButton = createButton("Sign Up");
   signupButton.position(200, 50);
   signupButton.size(75, 25);
   signupButton.mousePressed(signup);

   logoutButton = createButton("Log Out");
   logoutButton.position(window.innerWidth-200, 50);
   logoutButton.size(75, 25);
   logoutButton.mousePressed(logout);
   logoutButton.hide();

   toPlay = createButton("Play");
   toPlay.position(window.innerWidth/2-50, window.innerHeight/2-50);
   toPlay.size(100, 50);
   toPlay.mousePressed(play);
   toPlay.hide();

   checkCookies();
}

function checkCookies(){
   var cusr = readCookie("username");
   var cpass = readCookie("password");
   if(cusr!="" && cpass!=""){
      autoLogin(cusr, cpass);
   }
}

function readCookie(key){
   var cookies = document.cookie.split(";");
   for(var i = 0; i<cookies.length; i++){
      cookies[i] = cookies[i].trim();
      if(cookies[i].startsWith(key)){
         return(cookies[i].substring(key.length+1));
      }
   }
   return "";
}

function draw(){
   cnv.position(0,0);
}

function rnd(){
   return Math.floor(Math.random()*255);
}

function play(){
   window.location = '/play'
}

function autoLogin(u, p){
   httpPost("/login", {usr: u, pass: p}, (res) => {
      res = JSON.parse(res);
      if(res.status==13){
         var c = color(res.color);
         background(c);
         document.cookie = `r=${c.levels[0]}`;
         document.cookie = `g=${c.levels[1]}`;
         document.cookie = `b=${c.levels[2]}`;
         toPlay.show();
         loginButton.hide();
         signupButton.hide();
         logoutButton.show();
      }
   });
}

function login(){
   var logininfo = {};
   logininfo.usr = prompt("Username", "");
   logininfo.pass = prompt("Password", "");
   httpPost("/login", logininfo, (res) => {
      res = JSON.parse(res);
      if(res.status==13){
         var c = color(res.color);
         background(c);
         document.cookie = `username=${logininfo.usr}`;
         document.cookie = `password=${logininfo.pass}`;
         document.cookie = `r=${c.levels[0]}`;
         document.cookie = `g=${c.levels[1]}`;
         document.cookie = `b=${c.levels[2]}`;
         toPlay.show();
         loginButton.hide();
         signupButton.hide();
         logoutButton.show();
      }
   });
}

function signup(){
   var logininfo = {};
   logininfo.usr = prompt("Username", "");
   logininfo.pass = prompt("Password", "");
   logininfo.color = prompt("Color", "");
   httpPost("/register", logininfo, (res) => {
      res =JSON.parse(res);
      if(res.status == 13){
         var c = color(logininfo.color);
         document.cookie = `username=${logininfo.usr}`;
         document.cookie = `password=${logininfo.pass}`;
         document.cookie = `r=${c.levels[0]}`;
         document.cookie = `g=${c.levels[1]}`;
         document.cookie = `b=${c.levels[2]}`;
         background(c);
         loginButton.hide();
         signupButton.hide();
         toPlay.show();
         logoutButton.show();
      }
   });
}

function logout(){
   deleteCookie("username");
   deleteCookie("password");
   logoutButton.hide();
   toPlay.hide();
   loginButton.show();
   signupButton.show();
   console.log(defaultColor);
   background(defaultColor);
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
