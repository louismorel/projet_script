let cs = document.getElementById("cv");
let ctx = cs.getContext("2d");

var timeLeft = 190;

let gameStopped = false;

let lastHit = new Date();

let isStopped = false;
let lastStop;

let backgroundMusic = new Audio("Silent-night.mp3");
backgroundMusic.volume = 0.2;
let hohoho = new Audio("Emotisound-hoho.mp3");
hohoho.volume = 1;
let elfLaugh = new Audio("sf-laugh-elf-creature-01.mp3");
elfLaugh.volume = 1;
let loose = new Audio("SoundOfSilence.mp3");
loose.volume = 0.8;
let grelot = new Audio("grelot.mp3");
grelot.volume = 1;

let playBackGroundMusic = function(){
	if(!gameStopped)
		backgroundMusic.play();
};
let stopBackGroundMusic = function(){
	backgroundMusic.volume = 0;
};

let playHohoho = function(){
	hohoho.play();
};
let stopHohoho = function(){
	hohoho.volume = 0;
};


let playElfLaugh = function(){
	elfLaugh.play();
};
let stopElfLaugh = function(){
	elfLaugh.volume = 0;
};


let playLooseMusic = function(){
	loose.play();
};

let playGrelot = function(){
	grelot.play();
};
let stopGrelot = function(){
	grelot.volume = 0;
};

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
let listBall = new Array();

let decreaseTime = function(){
	if(!gameStopped){
		timeLeft-=1;
		console.log(timeLeft);
	}
};

let walkSanta = function () {
	if(sxSanta===142)
		sxSanta=0;
	else
		sxSanta+=71;
};

let walkElf =function(){
	if(!isStopped){
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

let drawBall = function(){
	if(listBall.length>0){
		for(let i = 0; i<listBall.length ; i++)
			ctx.drawImage(ballIm, 0, 0, 41, 50, listBall[i].x, listBall[i].y, 41, 50);
	}
};

let drawMenu = function(){
	ctx.drawImage(menu, 0, 0, 800, 100, 0, 550, 800, 100);
};

let write = function(){
	ctx.font = "30px Verdana";
	ctx.fillStyle = "#FFFFFF";
	let min = Math.floor(timeLeft/60);
	let sec = (timeLeft - min*60);
	if(sec<10)
		sec = "0"+sec;
	ctx.fillText(min+":"+sec, 55, 585);
	ctx.fillText(santa.money, 385, 585);
	ctx.fillText(santa.gift, 713, 585);
};

let draw = function(){
	if(!gameStopped){
		drawFond();
		drawTree();
		drawElf();
		drawBall();
		drawSanta();
		drawMenu();
		write();
	}
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

let createBall = function(){
	if(timeLeft===120 || timeLeft===50){
		let ball = new Ball(Math.floor((Math.random()*740)),Math.floor((Math.random()*520)));
		listBall.push(ball);
	}
};

let deleteBall = function(x, y){
	for(let i = 0; i<listBall.length;i++){	
		if(listBall[i].x===x && listBall[i].y === y){
			listBall.splice(i,1);
		}
	}
};

let create = function(){
	createTree();
	createBall();
};

let hitTree = function(){
	for(let i = 0; i<listTree.length ; i++){
		if(((santa.x + 55 >= listTree[i].x) && (santa.y + 80 >= listTree[i].y)) && ((santa.x <= listTree[i].x + 45) && (santa.y <= listTree[i].y + 60))){
			if(!listTree[i].isDone){
				playHohoho();
				createElfs(listTree[i]);
				listTree[i].found();
				santa.dropGifts(listTree[i]);
			}			
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

let hitBall = function(){
	for(let i = 0; i<listBall.length ; i++){
		if(((santa.x + 45 >= listBall[i].x) && (santa.y + 75 >= listBall[i].y)) && ((santa.x <= listBall[i].x + 40) && (santa.y <= listBall[i].y + 40))){
			listBall[i].found();
			playGrelot();
			deleteBall(listBall[i].x, listBall[i].y);
			isStopped = true;
			lastStop = timeLeft;
		}
	}
};

let hit = function(){
	hitTree();
	hitElf();
	hitBall();
};

let changeStop = function(){
	if(isStopped===true && lastStop!=null && Math.abs(lastStop-timeLeft>=15))
		isStopped=false;
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

let ballIm = new Image();
ballIm.src = "../Images/ball.png";

let menu = new Image();
menu.src = "../Images/menu.png";

document.onkeydown = function (e) {
	if(!gameStopped){
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
	}
};

let winGame = function(){
	if(timeLeft>0 && santa.gift<=0 && santa.money>0 && !gameStopped){
		gameStopped = true;
		stopHohoho();
		stopElfLaugh();
		stopGrelot();
		alert("You won with "+santa.money+" euros !");
	}
};

let stopGame = function(){
	if(timeLeft===0 || santa.money===0){
		gameStopped = true;
		stopBackGroundMusic();
		stopHohoho();
		stopElfLaugh();
		stopGrelot();
		playLooseMusic();
		alert("You loose with "+santa.gift+" gifts left...");
	}
};
setInterval(decreaseTime,1000);
setInterval(playBackGroundMusic,500);
setInterval(deleteTree,500);
setInterval(create,10000);
setInterval(walkElf, 250);
setInterval(draw,500);
setInterval(hit,250);
setInterval(changeStop,1000);
setInterval(winGame,500);
setInterval(stopGame,1000);


