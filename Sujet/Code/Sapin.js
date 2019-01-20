function Sapin(){
	if(Math.floor((Math.random()*10))>=7){
		this.isDecorated = true;
	}
	else{
		this.isDecorated = false;
	}	
	this.x = Math.floor((Math.random()*740));
	this.y = Math.floor((Math.random()*520));
	this.isDone = false;
	this.start = new Date();
}

Sapin.prototype.found = function(){
	this.isDone = true;
};

Sapin.prototype.getTime = function(){
	let end = new Date();
	let timeDiff = Math.abs(end.getTime() - this.start.getTime());	
	return timeDiff;
};
