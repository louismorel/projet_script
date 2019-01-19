function Imp(x,y, direction){
	this.x = x;
	this.y = y;
	this.speed = 3;
	this.direction = direction;
	this.ix = 32;
	this.iy = 0;
}

Imp.prototype.changeSpeed = function(speed){
	this.speed = speed;
}