var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");
var x = 0;
var y = 0;
var direction = {
"ArrowRight": 110,
"ArrowLeft": 302,
"ArrowUp": 5,
"ArrowDown": 205
};
var sy = direction["ArrowDown"];
var drawPereNoel = function () {
	ctx.drawImage(pereNoel, 0, sy, 70, 100, x, y, 70, 100);
};

var drawFond = function(){
	ctx.drawImage(fond, 0, 0,800,600);
};
var fond  = new Image();
fond.src = "../Images/neige.jpg";
fond.onload = drawFond;
var pereNoel = new Image();
pereNoel.src = "../ressources/santa.png";
pereNoel.onload = drawPereNoel;
document.onkeydown = function (e) {
	if (direction[e.key] === undefined) {
		return;
	}
	sy = direction[e.key];
	if(e.key==="ArrowDown")
		y+=5;
	else if(e.key==="ArrowUp")
		y-=5;
	else if(e.key==="ArrowLeft")
		x-=5;
	else if(e.key==="ArrowRight")
		x+=5;
	ctx.clearRect(0, 0, 800, 600);
	drawFond();
	drawPereNoel();
};