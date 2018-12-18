var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

var direction = {
"ArrowRight": 105,
"ArrowLeft": 297,
"ArrowUp": 5,
"ArrowDown": 200
};
var sy = direction["ArrowDown"];
var drawPereNoel = function () {
	ctx.drawImage(pereNoel, 0, sy, 70, 100, 0, 0, 70, 100);
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
	ctx.clearRect(0, 0, 800, 600);
	drawFond();
	drawPereNoel();
};