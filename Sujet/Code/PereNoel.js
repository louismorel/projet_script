function PereNoel(){
	this.x = 0;
	this.y = 0;
	this.money = 100;
	this.gift = 100;
}

PereNoel.prototype.dropGifts = function(tree){
	if(tree.isDecorated)
		this.gift -= 10;
	else
		this.gift -= 5;
};

PereNoel.prototype.dropMoney = function(){
	this.money -= 5;
}