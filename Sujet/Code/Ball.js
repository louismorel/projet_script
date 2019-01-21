function Ball(x,y){
	this.x = x;
	this.y = y;
	this.isDone = false;
}

Ball.prototype.found = function(){
	this.isDone = true;
};