function Elf(x,y,dXY,dPlusMinus){
	this.x = x;
	this.y = y;
	this.direction = 0;
	this.time = new Date();
	this.directionXY = dXY;
	this.directionPlusMinus = dPlusMinus;
	this.hit;
}

Elf.prototype.getTime = function(){
	let end = new Date();
	let timeDiff = Math.abs(end.getTime() - this.time.getTime());	
	return timeDiff;
};

Elf.prototype.changeTime = function(){
	this.time = new Date();
};

Elf.prototype.changeDirection = function(dir1,dir2){
	this.directionXY = dir1;
	this.directionPlusMinus = dir2;
};