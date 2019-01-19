
            let cs = document.getElementById("cv");
            let ctx = cs.getContext("2d");
            ctx.font = "25px Calibri";
            
            let backgroundMusic = new Audio("sound.mp3");
            let hoho = new Audio("hoho.mp3");
            let money = new Audio("money.mp3");
            let loose = new Audio("loose.mp3");
            let freeze = new Audio("freeze.mp3");
            let victory = new Audio("victory.mp3");
            let speedImp = new Audio("speedImp.mp3");
            
            let music = function(){
               backgroundMusic.play();         
            };


            
            
         
            //Selectionner la ligne de l'image du père noël
            let directionY = {"ArrowUp" : 15, "ArrowRight" : 110,"ArrowDown" : 210,"ArrowLeft" : 310};
            //Selectionner la colonne de l'image du père noël 
            let directionX = {"ArrowLeft" : 0, "ArrowMidle" : 75,"ArrowRight" : 150};
            
            //Selectionner la ligne de l'image du lutin
            let directionImpY = {"ArrowUp" : 96, "ArrowRight" : 64,"ArrowDown" : 0,"ArrowLeft" : 32};
            //Selectionner la colonne de l'image du lutin
            let directionImpX = {"ArrowLeft" : 0, "ArrowMidle" : 32,"ArrowRight" : 64};
            
            let santa = new Santa(0,0,100,100);
            
            let listTree = [];
            let listImp = [];
            let listBall = [];
            
            
            
            //sx, sy correspondent respectivement à la colonne et la ligne de l'image du père noël pour choisir sa posture
            let sy = directionY.ArrowDown;
            let sx = directionX.ArrowMidle;
                      
            //Les 4 entiers qui suivent permettre de se repérer pour choisir la bonne posture du père noël
            let nbDown = 0;
            let nbUp = 0;
            let nbLeft = 0;
            let nbRight = 0;
            
            let nbTemps = 0;
            
            let time = 210;
            let timeString = "";
            let isBallTaken = false;
            let freezeTimeLeft = 0;
            
            let createBall = function(){
                        let ballX, ballY;
                        do{
                                    ballX = Math.floor(Math.random() * 700);
                                    ballY = Math.floor(Math.random() * 450);
                        } while(Math.abs(santa.x - ballX) < 200 && Math.abs(santa.y - ballY) < 200);
                        listBall.push(new Ball(ballX,ballY,"freeze"));
            };
            
            let drawBall = function(){
                        listBall.forEach(function(ball){
                                    ctx.drawImage(imgBall,0,0,840,977,ball.x,ball.y,42,49);
                        });
            };
            
            let timeDown = function(){
                        time--;
                        
                        if(freezeTimeLeft < 1){
                                    isBallTaken = false;
                        }else{
                                    freezeTimeLeft--;
                        }
                        
                        timeString = Math.floor(time/60) + ":";
                        if(time%60 < 10){
                                    timeString += "0";
                        }
                        timeString += time%60;
                        
                        if(time === 0){
                                    loose.play();
                                    alert("Game over ! Le temps est écoulé. :(\nIl vous restait " + santa.gift + " cadeaux à livrer.");
                        }
                        
                        if(time === 140 || time === 60){
                                    createBall();
                        }
                        
                        if(time === 20){
                                    listImp.forEach(function(imp){
                                                speedImp.play();
                                                imp.speed += imp.speed;
                                    });
                        }
            };

            
            //Fonction pour dessiner le père noël
            let drawSanta = function(){
            ctx.drawImage(imgSanta,sx,sy,75,100,santa.x,santa.y,47,57);
            };
            
            //Fonction pour dessiner le fond notre texture
            let drawTexture = function(){
                        ctx.drawImage(texture,0,0,800,640);
            };
            
            
            //Fonction pour positionner aléatoirement un arbre
            let drawTree = function(){
                        
                        listTree.push(new Tree(Math.floor(Math.random() * 700),Math.floor(Math.random() * 450),Math.floor(Math.random() * (10/7))+1));
                        //Répartition du type d'arbre : type = 1 dans 70% des cas et type 2 = 30% des cas
                        newImp();
                        if(listTree[listTree.length-1].type == 2){
                                 newImp();   
                        }
                        
            };
            
            let newImp = function(){
                        do{
                                    impX = Math.floor(Math.random() * 700);
                                    impY = Math.floor(Math.random() * 450);
                        } while(Math.abs(santa.x - impX) < 200 && Math.abs(santa.y - impY) < 200);
                        listImp.push(new Imp(impX, impY, Math.floor(4*Math.random())));
            };
            
            let drawTreeOnly = function(){
                        
                        listTree.forEach(function(tree){
                                    if(tree.type == 1){
                                         if(tree.isDone){
                                                ctx.drawImage(imgTree,352,294,64,84,tree.x - 3,tree.y,64,84);  
                                                }
                                                else{
                                                      ctx.drawImage(imgTree,355,209,60,78,tree.x,tree.y,60,78);        
                                                }
                                    }
                                    else{
                                          if(tree.isDone){
                                                ctx.drawImage(imgTree,293,300,59,84,tree.x,tree.y,59,84);  
                                                }
                                                else{
                                                    ctx.drawImage(imgTree,292,215,59,72,tree.x,tree.y,59,72);          
                                                }
                                    }
                        });        
                          
            };
            
            //On récupère la texture puis on l'insère dans une variable utilisable de type image
            let texture = new Image();
            texture.src = "texture.jpg";
            texture.onload = drawTexture;
            
            //On récupère l'image avec les différentes postures du père noël puis on l'insère dans une variable utilisable de type image
            let imgSanta = new Image();
            imgSanta.src = "santa.png";
            imgSanta.onload = drawSanta;
            
            //On récupère l'image avec les arbres puis on l'insère dans une variable utilisable de type image
            let imgTree = new Image();
            imgTree.src = "tree.png";
            imgTree.onload = drawTree;
            
            //On récupère l'image avec les lutins puis on l'insère dans une variable utilisable de type image
            let imgImp = new Image();
            imgImp.src = "lutin.png";
            imgImp.onload = drawTree;
            
            //On récupère la boule de noël puis on l'insère dans une variable utilisable de type image
            let imgBall = new Image();
            imgBall.src = "ball.png";
            imgBall.onload = drawTexture;
            
            
            
            //On récupère le menu puis on l'insère dans une variable utilisable de type image
            let imgBarre = new Image();
            imgBarre.src = "barre.png";
            imgBarre.onload = drawTexture;
            
            //On récupère le logo coin puis on l'insère dans une variable utilisable de type image
            let imgCoin = new Image();
            imgCoin.src = "coin.png";
            imgCoin.onload = drawTexture;
            
            //On récupère le logo cadeau puis on l'insère dans une variable utilisable de type image
            let imgGift = new Image();
            imgGift.src = "gift.png";
            imgGift.onload = drawTexture;
            
            //On récupère le logo cadeau puis on l'insère dans une variable utilisable de type image
            let imgChrono = new Image();
            imgChrono.src = "chrono.png";
            imgChrono.onload = drawTexture;
            
            
            let drawInterface = function(){
                        
                        ctx.drawImage(imgBarre,0,0,800,40,0,600,800,40);
                        ctx.drawImage(imgCoin,0,0,288,288,78,609,23,23);
                        ctx.drawImage(imgGift,0,0,512,512,368,609,23,23);
                        ctx.drawImage(imgChrono,0,0,48,48,639,609,23,23);
                        ctx.fillText(santa.money , 108, 628);
                        ctx.fillText(santa.gift , 398, 628);
                        ctx.fillText(timeString , 669, 628);
            };
            
            
            
            
            
            
            let timing = function(){
                        let i = 0;
                        listTree.forEach(function(tree){
                                    tree.timeDown();
                                    if(tree.timeLeft <= 0){
                                                listTree.splice(i,1);
                                    }
                                    i++;
                        });
            };
            

            //Fonction permettant de créer l'animation du père noël
            document.onkeydown = function(e){
                //Sécurité         
                if (directionY[e.key]===undefined && directionX[e.key]===undefined ){
                    return;
                }
                
                //On capte le clic
                sy = directionY[e.key];
                nbTemps ++;
                //Cas du clic avec la flèche du bas
                if(e.key==="ArrowDown"){
                    nbDown++;
                    
                    //Suivant la valeur de nbDown on désside de la posture qu'aura le père noël en modifiant sx
                    if(nbDown %2 ===0 ){
                        sx = directionX.ArrowMidle;
                        
                        if(santa.y > 600 ){
                                    santa.y =0; //Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.y+=12;
                        }
                    }
                    else if(nbDown %3 >0 ){
                        sx = directionX.ArrowRight;
                        if(santa.y === 600 ){
                                    santa.y =0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.y+=12;
                        }
                    }
                    else{
                        sx = directionX.ArrowLeft;
                        if(santa.y > 600 ){
                                    santa.y =0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.y+=12;
                        }
                        
                    }
                    
                }
                
                //Cas du clic avec la flèche du haut
                else if(e.key==="ArrowUp"){
                        nbUp++;
                        //Suivant la valeur de nbUp on désside de la posture qu'aura le père noël en modifiant sx
                    if(nbUp %2 ===0 ){
                        sx = directionX.ArrowMidle;
                        if(santa.y < 0 ){
                                    santa.y =600;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.y-=12;
                        }
                        
                    }
                    else if(nbUp %3 ===0 ){
                        sx = directionX.ArrowRight;
                        if(santa.y < 0 ){
                                    santa.y =600;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.y-=12;
                        }
                    }
                    else{
                        sx = directionX.ArrowLeft;
                        if(santa.y < 0 ){
                                    santa.y =600;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.y-=12;
                        }
                    }
                    
                }
                
                //Cas du clic avec la flèche de gauche
                else if(e.key==="ArrowLeft"){
                        nbLeft++;
                        //Suivant la valeur de nbLeft on désside de la posture qu'aura le père noël en modifiant sx
                    if(nbLeft %2 ===0 ){
                        sx = directionX.ArrowMidle;
                        if(santa.x < 0 ){
                                    santa.x =800;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.x-=12;
                        }
                        
                    }
                    else if(nbLeft %3 ===0 ){
                        sx = directionX.ArrowRight;
                        if(santa.x < 0 ){
                                    santa.x =800;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.x-=12;
                        }
                        
                    }
                    else{
                        sx = directionX.ArrowLeft;
                        if(santa.x < 0 ){
                                    santa.x =800;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    santa.x-=12;
                        }
                    }
            
                }
                
                //Cas du clic avec la flèche de droite 
                else if(e.key==="ArrowRight"){
                        nbRight++;
                        //Suivant la valeur de nbRight on désside de la posture qu'aura le père noël en modifiant sx
                    if(nbRight %2 ===0 ){
                        sx = directionX.ArrowMidle;
                         if(santa.x > 800){
                                    santa.x=0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                   santa.x+=12;
                        }
                    }
                    else if(nbRight %3 ===0 ){
                        sx = directionX.ArrowRight;
                         if(santa.x > 800){
                                    santa.x=0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                   santa.x+=12;
                        }
                    }
                    else{
                        sx = directionX.ArrowLeft;
                         if(santa.x > 800 ){
                                    santa.x=0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                   santa.x+=12;
                        }
                    }
                    
                }
                
                //Après le clic on redessine le fond, le père noël et les arbres 
                //ctx.clearRect(0,0,800,800);
                        listTree.forEach(function(tree){
                           if(tree.x + 31 < santa.x + 75 && tree.x + 31 > santa.x && tree.y + 59 < santa.y + 100 && tree.y + 59 > santa.y && !tree.isDone){
                                    tree.isDone = true;
                                    santa.dropOff(tree.type);
                                    hoho.play();
                                    if(santa.gift <= 0){
                                                let timeSpent = 210 - time;
                                                timeSpentString = Math.floor(timeSpent/60) + "minute(s) et ";
                                                if(timeSpent%60 < 10){
                                                            timeSpentString += "0";
                                                }
                                                timeSpentString += timeSpent%60 + " secondes.";
                                                victory.play();
                                                alert("Bravo ! Vous avez livré tous les cadeaux en " + timeSpentString + "\nIl vous reste " + santa.money + " euros.");
                                    }
                           }
                        });
                        let k = 0;
                        listBall.forEach(function(ball){
                                    if(ball.x + 21 < santa.x + 75 && ball.x + 21 > santa.x && ball.y + 25 < santa.y + 100 && ball.y + 25 > santa.y){
                                                listBall.splice(k,1);
                                                freeze.play();
                                                k++;
                                                isBallTaken = true;
                                                freezeTimeLeft = 15;
                                    }
                        });
            };
            
            let ImpHit = function(imp){
                        if(imp.x + 8 < santa.x + 45 && imp.x + 24 > santa.x && imp.y < santa.y + 40 && imp.y + 32 > santa.y + 15){
                                    santa.getHurt();
                                    money.play();
                                    if(santa.money <= 0){
                                                loose.play();
                                                alert("Game over ! Les lutins vous ont tout pris :(");
                                    }
                                    do{
                                                imp.x = Math.floor(Math.random() * 700);
                                                imp.y = Math.floor(Math.random() * 450);
                                    } while(Math.abs(santa.x - imp.x) < 200 && Math.abs(santa.y - imp.y) < 200);
                        }
            };
            
            let ImpMove = 0;
            let ImpStanding = function (imp){
                        ImpMove ++;
                        switch (imp.direction){
                        case 1 :
                                    imp.iy = directionImpY.ArrowRight;                         
                                    
                                    //Suivant la valeur de nbRight on désside de la posture qu'aura le lutin en modifiant ix
                                    if(ImpMove %2 ===0 ){
                                                imp.ix = directionImpX.ArrowMidle;
                                    }
                                    else if(ImpMove %3 ===0 ){
                                                imp.ix = directionImpX.ArrowRight;
                                    }
                                    else{
                                                imp.ix = directionImpX.ArrowLeft;
                                    }
                                    break;
                         case 2 :
                                    imp.iy = directionImpY.ArrowDown;                         
                                    ImpMove ++;
                                    //Suivant la valeur de nbRight on désside de la posture qu'aura le lutin en modifiant ix
                                    if(ImpMove%2 ===0 ){
                                                imp.ix = directionImpX.ArrowMidle;
                                    }
                                    else if(ImpMove %3 ===0 ){
                                                imp.ix = directionImpX.ArrowRight;
                                    }
                                    else{
                                                imp.ix = directionImpX.ArrowLeft;
                                    }
                                    break;
                        
                        
            
                        case 3 :
                                    imp.iy = directionImpY.ArrowLeft;                         
                                    ImpMove ++;
                                    //Suivant la valeur de nbRight on désside de la posture qu'aura le lutin en modifiant ix
                                    if(ImpMove%2 ===0 ){
                                                imp.ix = directionImpX.ArrowMidle;
                                    }
                                    else if(ImpMove %3 ===0 ){
                                                imp.ix = directionImpX.ArrowRight;
                                    }
                                    else{
                                                imp.ix = directionImpX.ArrowLeft;
                                    }
                        
                        break;
                        
                        default :
                                    imp.iy = directionImpY.ArrowUp;                         
                                    ImpMove ++;
                                    //Suivant la valeur de nbRight on désside de la posture qu'aura le lutin en modifiant ix
                                    if(ImpMove%2 ===0 ){
                                                imp.ix = directionImpX.ArrowMidle;
                                    }
                                    else if(ImpMove %3 ===0 ){
                                                imp.ix = directionImpX.ArrowRight;
                                    }
                                    else{
                                                imp.ix = directionImpX.ArrowLeft;
                                    }
                        }
                        
            };
            
            
            let impMoves = function(){
                        if(!isBallTaken){
                                    listImp.forEach(function(imp){
                                                if(imp.x < 10){
                                                            imp.direction = 1;
                                                            
                                                }else if(imp.x > 760){
                                                            imp.direction = 3;
                                                }
                                                if(imp.y < 10){
                                                            imp.direction = 2;
                                                }else if(imp.y > 560){
                                                            imp.direction = 0;
                                                }
                                                if(Math.random() < 0.05){
                                                            imp.direction = Math.floor(4*Math.random());
                                                }
                                                ImpStanding(imp);
                                                switch(imp.direction){
                                                case 1:
                                                            imp.x += imp.speed;
                                                            break;
                                                case 2:
                                                            imp.y += imp.speed;
                                                            break;
                                                case 3:
                                                            imp.x -= imp.speed;
                                                            break;
                                                default:
                                                            imp.y -= imp.speed;
                                                }
                                                ImpHit(imp);
                                                
                                    });
                        }
            };
            
            let drawImp = function(){
                        listImp.forEach(function(imp){
                                      ctx.drawImage(imgImp,imp.ix,imp.iy,32,32,imp.x,imp.y,32,32);       
                        });
            };
            
            let draw = function(){
                        drawTexture();
                        drawTreeOnly(); 
                        drawSanta();
                        drawImp();
                        drawBall();
                        drawInterface();
            };
            
            setInterval(timeDown, 1000);
            setInterval(drawTree, 10000);
            setInterval(timing, 1000);
            setInterval(impMoves, 50);
            setInterval(draw, 16);
            setInterval(music,500);
           
           