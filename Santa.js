function Santa(x,y,money,gift){
    this.x = x;
	this.y = y;
	this.money = money;
	this.gift = gift;
}

Santa.prototype.dropOff = function(type){
	this.gift -= 5*type;
}

Santa.prototype.getHurt = function (){
    this.money -= 5;
}
  