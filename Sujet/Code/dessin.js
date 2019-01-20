let cs = document.getElementById("cv");
let ctx = cs.getContext("2d");

var timeLeft = 3;

let lastHit = new Date();

let backgroundMusic = new Audio("Silent-night.mp3");
backgroundMusic.volume = 0.2;
let hohoho = new Audio("Emotisound-hoho.mp3");
hohoho.volume = 1;
let elfLaugh = new Audio("sf-laugh-elf-creature-01.mp3");
elfLaugh.volume = 1;
let loose = new Audio("SoundOfSilence.mp3");
loose.volume = 0.8;

let playBackGroundMusic = function(){
	backgroundMusic.play();
};

let playHohoho = function(){
	hohoho.play();
};

let playElfLaugh = function(){
	elfLaugh.play();
};

let playLooseMusic = function(){
	loose.play();
}

let direction = {
	"ArrowRight": 110,
	"ArrowLeft": 302,
	"ArrowUp": 5,
	"ArrowDown": 205
};
let sySanta = direction["ArrowDown"];
let sxSanta = 0;
let santa = new PereNoel();

let listTree = new Array();
let listElf = new Array();

let decreaseTime = function(){
	timeLeft-=1;
	console.log(timeLeft);
};

let walkSanta = function () {
	if(sxSanta===142)
		sxSanta=0;
	else
		sxSanta+=71;
};

let walkElf =function(){
	for(let i=0 ; i<listElf.length ; i++){
		if(listElf[i].getTime()>3000){
			let directionXY = Math.round(Math.random());
			let directionPlusMinus = Math.round(Math.random());
			listElf[i].changeDirection(directionXY, directionPlusMinus);
			listElf[i].changeTime()
		}
		else{
			if(listElf[i].directionXY===0){
				if(listElf[i].directionPlusMinus===0)
					listElf[i].x += 3;
				else
					listElf[i].x -= 3;
			}
			else{
				if(listElf[i].directionPlusMinus===0)
					listElf[i].y += 3;
				else
					listElf[i].y -= 3;
			}	
		}
		if(listElf[i].x > 775){
			listElf[i].x = 0;
		}else if(listElf[i].x < 0){
			listElf[i].x = 775;
		}else if(listElf[i].y > 570){
			listElf[i].y = 0;
		}else if(listElf[i].y < 0){
			listElf[i].y = 570;
		}		
	}
};

let drawSanta = function () {
	ctx.drawImage(pereNoel, sxSanta, sySanta, 70, 100, santa.x, santa.y, 70, 100);
};

let drawFond = function(){
	ctx.drawImage(fond, 0, 0,800,600);
};

let drawTree = function(){
	for(let i = 0; i<listTree.length;i++){
		if(!(listTree[i].isDecorated)){
			if(!listTree[i].isDone)
				ctx.drawImage(sapin,listTree[i].x,listTree[i].y);
			else
				ctx.drawImage(sapinGift,listTree[i].x,listTree[i].y);
		}
		else{
			if(!listTree[i].isDone)
				ctx.drawImage(sapinDecore,listTree[i].x,listTree[i].y);
			else
				ctx.drawImage(sapinDecoreGift,listTree[i].x,listTree[i].y);
		}
	}
};

let drawElf = function(){
	for(let i = 0; i<listElf.length;i++){
		if(listElf[i].directionXY===0){
			if(listElf[i].directionPlusMinus===0){
				ctx.drawImage(elfIm, 3, 64, 26, 31, listElf[i].x, listElf[i].y, 26, 31);
			}else{
				ctx.drawImage(elfIm, 3, 32, 26, 31, listElf[i].x, listElf[i].y, 26, 31);
			}
		}
		else{
			if(listElf[i].directionPlusMinus===1){
				ctx.drawImage(elfIm, 3, 96, 26, 31, listElf[i].x, listElf[i].y, 26, 31);
			}else{
				ctx.drawImage(elfIm, 3, 0, 26, 31, listElf[i].x, listElf[i].y, 26, 31);
			}
		}
	}
};

let draw = function(){
	drawFond();
	drawTree();
	drawElf();
	drawSanta();
};

let createTree = function(){
	let tree = new Sapin();
	listTree.push(tree);
};

let deleteTree = function(){
	for(let i = 0; i<listTree.length;i++){	
		if(listTree[i].isDecorated && listTree[i].getTime() >= 9998){
			listTree.splice(i,1);
		}
		else if(!(listTree[i].isDecorated) && listTree[i].getTime() >= 19998){
			listTree.splice(i,1);
		}
	}
};

let createElfs = function(tree){
	let elf = new Elf(Math.floor((Math.random()*740)),Math.floor((Math.random()*520)),Math.round(Math.random()),Math.round(Math.random()));
	if(!tree.isDecorated){
		listElf.push(elf);
	}
	else{
		listElf.push(elf);
		elf = new Elf(Math.floor((Math.random()*740)),Math.floor((Math.random()*520)),Math.round(Math.random()),Math.round(Math.random()));
		listElf.push(elf);
	}
	
};

let hitTree = function(){
	for(let i = 0; i<listTree.length ; i++){
		if(((santa.x + 55 >= listTree[i].x) && (santa.y + 80 >= listTree[i].y)) && ((santa.x <= listTree[i].x + 45) && (santa.y <= listTree[i].y + 60))){
			if(!listTree[i].isDone){
				playHohoho();
				createElfs(listTree[i]);
			}
			listTree[i].found();
			santa.dropGifts(listTree[i]);
			
		}
	}
};

let hitElf = function(){
	for(let i = 0; i<listElf.length ; i++){
		if(((santa.x + 55 >= listElf[i].x) && (santa.y + 75 >= listElf[i].y)) && ((santa.x <= listElf[i].x + 25) && (santa.y <= listElf[i].y + 30))){
			if(lastHit===null || Math.round(new Date()-lastHit > 2000)){
				lastHit = new Date();
				console.log("Touché");
				playElfLaugh();
				santa.dropMoney();
			}			
		}
	}
};

let fond  = new Image();
fond.src = "../Images/neige.jpg";
fond.onload = draw;

let pereNoel = new Image();
pereNoel.src = "../ressources/santa.png";

let sapin = new Image();
sapin.src = "../Images/sapin.png";

let sapinGift = new Image();
sapinGift.src = "../Images/sapin_gift.png";

let sapinDecore = new Image();
sapinDecore.src = "../Images/sapin_decore.png";

let sapinDecoreGift = new Image();
sapinDecoreGift.src = "../Images/sapin_decore_gift.png";

let elfIm = new Image();
elfIm.src = "../ressources/lutin.png";

document.onkeydown = function (e) {
	if (direction[e.key] === undefined) {
		return;
	}
	sySanta = direction[e.key];
	if(e.key==="ArrowDown")
		santa.y+=5;
	else if(e.key==="ArrowUp")
		santa.y-=5;
	else if(e.key==="ArrowLeft")
		santa.x-=5;
	else if(e.key==="ArrowRight")
		santa.x+=5;
	if(santa.x>780)
		santa.x=0;
	else if(santa.x<0)
		santa.x=780;
	if(santa.y>580)
		santa.y=0;
	else if(santa.y<0)
		santa.y=580;
	walkSanta();
	ctx.clearRect(0, 0, 800, 600);
	draw();
};

setInterval(decreaseTime,1000);
setInterval(playBackGroundMusic,1);
setInterval(deleteTree,500);
setInterval(createTree,10000);
setInterval(walkElf, 250);
setInterval(draw,500);
setInterval(hitTree,100);
setInterval(hitElf,200);

