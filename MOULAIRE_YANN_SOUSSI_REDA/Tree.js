  function Tree(x,y,type){
                        this.x = x;
                        this.y = y;
                        this.type = type;
                        this.present = 5*this.type;
                        this.timeLeft = Math.floor(10/(this.type/2));
                        this.isDone = false;
            }
            
  Tree.prototype.timeDown = function (){
    this.timeLeft -= 1;
  }
  
   Tree.prototype.giftDone = function (){
    this.isDone = true;
  }
  