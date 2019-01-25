            // Composants graphiques du jeu
            let cs = document.getElementById("cv");
            let ctx = cs.getContext("2d");
            ctx.font = "25px Calibri";
            
            // Initialisation de tous les sons
            let backgroundMusic = new Audio("sound.mp3");
            let hoho = new Audio("hoho.mp3");
            let money = new Audio("money.mp3");
            let loose = new Audio("loose.mp3");
            let freeze = new Audio("freeze.mp3");
            let victory = new Audio("victory.mp3");
            let speedImp = new Audio("speedImp.mp3");
            let ballSound = new Audio("ball.mp3");
            let impFrozen = new Audio("impFrozen.mp3");
            
            // Fonction de lancement de la musique principale
            let music = function(){
               backgroundMusic.play();         
            };


            let playVictoryMusic = function(){
	victory.play();
};
            
         
            //Selectionner la ligne de l'image du père noël
            let directionY = {"ArrowUp" : 15, "ArrowRight" : 110,"ArrowDown" : 210,"ArrowLeft" : 310};
            //Selectionner la colonne de l'image du père noël 
            let directionX = {"ArrowLeft" : 0, "ArrowMidle" : 75,"ArrowRight" : 150};
            
            //Selectionner la ligne de l'image du lutin
            let directionImpY = {"ArrowUp" : 96, "ArrowRight" : 64,"ArrowDown" : 0,"ArrowLeft" : 32};
            //Selectionner la colonne de l'image du lutin
            let directionImpX = {"ArrowLeft" : 0, "ArrowMidle" : 32,"ArrowRight" : 64};
            
            // Initialisation du père Noël aux coordonées (0;0) avec 100 euros et 100 cadeaux
            let santa = new Santa(0,0,100,5);
            
            // Initialisation des listes d'arbres, de lutins et de boules de Noël
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
            
            // Entier permettant de gérer les différentes postures du père Noël dans chaque direction
            let nbTemps = 0;
            
            // Initialisation du temps et de quelques propriétés de la partie (String d'affichage du temps,lutins gelés ou pas avec un booléen, temps de gel restant)
            let time = 210;
            let timeString = "";
            let isBallTaken = false;
            let freezeTimeLeft = 0;
            
            // Fonction de création de la boule de noël 
            let createBall = function(){
                        let ballX, ballY;
                        do{
                                    ballX = Math.floor(Math.random() * 700); //Coordonéees aléatoire en x et y de la postion de la balle
                                    ballY = Math.floor(Math.random() * 450);
                        } while(Math.abs(santa.x - ballX) < 200 && Math.abs(santa.y - ballY) < 200); // On recommence tant que les coordonnées aléatoires proposées sont trop proches du père Noël
                        listBall.push(new Ball(ballX,ballY,"freeze"));
                        ballSound.play(); // Lancement du son lorsqu'une boule apparaît
            };
            
            // Fonction de dessin des différentes boules de Noël (il peut y en avoir jusqu'à 2 sur le plateau)
            let drawBall = function(){
                        listBall.forEach(function(ball){
                                    ctx.drawImage(imgBall,0,0,840,977,ball.x,ball.y,42,49);
                        });
            };
            
            // Fonction de réinitialisation de la partie
            let restart = function(){
                        
                        //Reinitialisation des variables 
                        santa = new Santa(0,0,100,100);
                        listTree = [];
                        listImp = [];
                        listBall = [];
                        sy = directionY.ArrowDown;
                        sx = directionX.ArrowMidle;
                        nbDown = 0;
                        nbUp = 0;
                        nbLeft = 0;
                        nbRight = 0;
                        nbTemps = 0;
                        time = 210;
                        timeString = "";
                        isBallTaken = false;
                        freezeTimeLeft = 0;
                        
                        
                        //Reinitialisation du temps
                        clearInterval(mainTimer);
                        clearInterval(addTreeTimer);
                        clearInterval(treeTimingTimer);
                        clearInterval(impTimer);
                        clearInterval(drawTimer);
                        clearInterval(musicTimer);
                        
                        mainTimer = setInterval(timeDown, 1000);
                        addTreeTimer = setInterval(addTree, 10000);
                        treeTimingTimer = setInterval(treeTiming, 1000);
                        impTimer = setInterval(impMoves, 50);
                        drawTimer = setInterval(draw, 16);
                        musicTimer = setInterval(music,500);
                        
                        //Pour restart avec un abre en début de jeu
                        addTree();
                        
                        //Initialisation du volume de la musique
                        backgroundMusic.volume=1;
                        impFrozen.volume = 0.0;
            };
            
            // Fonction permettant de décrémenter le temps à chaque seconde (et faire certaines actions qui se basent sur le temps de jeu)
            let timeDown = function(){
                        time--;
                        
                        // Calcul du temps de gel des lutins (terminé lorsque freezeTimeLeft = 0)
                        if(freezeTimeLeft < 1){
                                    isBallTaken = false;
                                    backgroundMusic.volume = 1;
                        }else{
                                    freezeTimeLeft--;
                        }
                        
                        // Affichage du temps restant
                        timeString = Math.floor(time/60) + ":";
                        if(time%60 < 10){
                                    timeString += "0";
                        }
                        timeString += time%60;
                        
                        // Fin de partie par manque de temps
                        if(time === 0){
                                    loose.play(); // Lancement de la musique de défaite
                                    backgroundMusic.volume=0.1;
                                    alert("Game over ! Le temps est écoulé. :(\nIl vous restait " + santa.gift + " cadeaux à livrer.");
                                    if(confirm("Voulez-vous recommencer ?")){
                                                restart();
                                    }else{
                                                close(); // Fermeture de la page
                                    }
                        }
                        
                        // Apparition des boules de Noël au bout de 1m10 et 2m30 de temps 
                        if(time === 140 || time === 60){
                                    createBall();
                        }
                        
                        // Accélération des lutins lorsqu'il reste 20 secondes de jeu
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
            let addTree = function(){
                        
                        listTree.push(new Tree(Math.floor(Math.random() * 700),Math.floor(Math.random() * 450),Math.floor(Math.random() * (10/7))+1));
                        //Répartition du type d'arbre : type = 1 dans 70% des cas et type 2 = 30% des cas
                        newImp();
                        if(listTree[listTree.length-1].type == 2){
                                 newImp();   
                        }
                        
            };
            
            // Fonction de création d'un nouveau lutin
            let newImp = function(){
                        do{
                                    impX = Math.floor(Math.random() * 700);
                                    impY = Math.floor(Math.random() * 450);
                        } while(Math.abs(santa.x - impX) < 200 && Math.abs(santa.y - impY) < 200); // On recommence jusqu'à ce que le lutin soit assez éloigné du père Noël
                        listImp.push(new Imp(impX, impY, Math.floor(4*Math.random())));
            };
            
            // Fonction de dessin des différents arbres présents sur le plateau (for each)
            let drawTreeOnly = function(){
                        listTree.forEach(function(tree){
                                    // En fonction du type d'arbre : dessin différent
                                    if(tree.type == 1){
                                         // En fonction de si l'arbre a été touché par le père Noël, afficher ou non des cadeaux
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
            imgTree.onload = addTree;
            
            //On récupère l'image avec les lutins puis on l'insère dans une variable utilisable de type image
            let imgImp = new Image();
            imgImp.src = "lutin.png";
            
            //On récupère la boule de noël puis on l'insère dans une variable utilisable de type image
            let imgBall = new Image();
            imgBall.src = "ball.png";
            
            //On récupère le menu puis on l'insère dans une variable utilisable de type image
            let imgBarre = new Image();
            imgBarre.src = "barre.png";
            
            //On récupère le logo coin puis on l'insère dans une variable utilisable de type image
            let imgCoin = new Image();
            imgCoin.src = "coin.png";
            
            //On récupère le logo cadeau puis on l'insère dans une variable utilisable de type image
            let imgGift = new Image();
            imgGift.src = "gift.png";
            
            //On récupère le logo chrono puis on l'insère dans une variable utilisable de type image
            let imgChrono = new Image();
            imgChrono.src = "chrono.png";
            
            // Fonction de dessin de toute l'interface (HUD)
            let drawInterface = function(){
                        ctx.drawImage(imgBarre,0,0,800,40,0,600,800,40);
                        ctx.drawImage(imgCoin,0,0,288,288,78,609,23,23);
                        ctx.drawImage(imgGift,0,0,512,512,368,609,23,23);
                        ctx.drawImage(imgChrono,0,0,48,48,639,609,23,23);
                        ctx.fillText(santa.money , 108, 628);
                        ctx.fillText(santa.gift , 398, 628);
                        ctx.fillText(timeString , 669, 628);
            };
            
            // Fonction de Disparition des arbres en fonction de leur temps de vie restant
            let treeTiming = function(){
                        let i = 0;
                        listTree.forEach(function(tree){
                                    tree.timeDown();
                                    if(tree.timeLeft <= 0){
                                                listTree.splice(i,1); // Supprime l'élément à l'indice i du tableau
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
                        // A chaque déplacement du père Noël, on teste s'il croise un arbre ou pas
                        listTree.forEach(function(tree){
                           if(tree.x + 31 < santa.x + 75 && tree.x + 31 > santa.x && tree.y + 59 < santa.y + 100 && tree.y + 59 > santa.y && !tree.isDone){
                                    tree.isDone = true;
                                    santa.dropOff(tree.type); // Il pose ses cadeaux
                                    hoho.play(); // Joue le son "Hohoho" du père Noël
                                    // Si le père Noël a livré tous ses cadeaux
                                    if(santa.gift <= 0){
                                                let timeSpent = 210 - time;
                                                timeSpentString = Math.floor(timeSpent/60) + " minute(s) et ";
                                                if(timeSpent%60 < 10){
                                                            timeSpentString += "0";
                                                }
                                                timeSpentString += timeSpent%60 + " secondes.";
                                                playVictoryMusic();
                                                backgroundMusic.volume=0.1;
                                                impFrozen.volume = 0.1;
                                                alert("Bravo ! Vous avez livré tous les cadeaux en " + timeSpentString + "\nIl vous reste " + santa.money + " euros.");
                                                //victory.play(); // Joue la musique de victoire
                                                if(confirm("Voulez-vous recommencer ?")){
                                                            restart();
                                                }else{
                                                            close();
                                                }
                                    }
                           }
                        });
                        
                        let k = 0;
                        // A chaque déplacement du père Noël, on teste s'il croise une boule de Noël ou pas
                        listBall.forEach(function(ball){
                                    if(ball.x + 21 < santa.x + 75 && ball.x + 21 > santa.x && ball.y + 25 < santa.y + 100 && ball.y + 25 > santa.y){
                                                listBall.splice(k,1);
                                                freeze.play(); // Joue le son de gel des lutins
                                                impFrozen.volume = 1;
                                                impFrozen.play(); // Joue la musique d'ambiance des lutins gelés
                                                backgroundMusic.volume = 0.0;
                                                k++;
                                                isBallTaken = true;
                                                freezeTimeLeft = 15; // Initialisation du compte à rebours de fin de gel à 15 secondes
                                    }
                        });
            };
            
            // Fonction qui teste si le père Noël touche un lutin ou pas
            let ImpHit = function(imp){
                        if(imp.x + 8 < santa.x + 45 && imp.x + 24 > santa.x && imp.y < santa.y + 40 && imp.y + 32 > santa.y + 15){
                                    santa.getHurt(); // Le père Noël perd de l'argent
                                    money.play(); // Joue le son d'un lutin qui ri
                                    // Si le père Noël n'a plus d'argent
                                    if(santa.money <= 0){
                                                loose.play(); // Joue la musique de défaite
                                                backgroundMusic.volume=0.1;
                                                alert("Game over ! Les lutins vous ont tout pris :(");
                                                if(confirm("Voulez-vous recommencer ?")){
                                                            restart();
                                                }else{
                                                            close();
                                                }
                                    }
                                    // Un lutin qui touche le père Noël est ensuite téléporté loin de lui
                                    do{
                                                imp.x = Math.floor(Math.random() * 700);
                                                imp.y = Math.floor(Math.random() * 450);
                                    } while(Math.abs(santa.x - imp.x) < 200 && Math.abs(santa.y - imp.y) < 200);
                        }
            };
            
            let ImpMove = 0;
            // Fonction qui détermine la direction de chaque lutin afin de savoir quelle images du sprite lui attribuer
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
            
            // Fonction de calcul du déplacement des lutins (gère le déplacement aléatoire et l'évitement des extrémités du plateau de jeu)
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
                                                            imp.direction = Math.floor(4*Math.random()); // Choisi une nouvelle direction aléatoire tous les 20 pas en moyenne (0.05 de probabilité)
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
                                                ImpHit(imp); // Teste si le lutin touche le père Noël
                                                
                                    });
                        }
            };
            
            // Fonction de dessin de tous les lutins
            let drawImp = function(){
                        listImp.forEach(function(imp){
                                      ctx.drawImage(imgImp,imp.ix,imp.iy,32,32,imp.x,imp.y,32,32);       
                        });
            };
            
            // Fonction de dessin principale (appelée toutes les 16 millisecondes => Jeu à 62.5 fps)
            let draw = function(){
                        drawTexture();
                        drawTreeOnly(); 
                        drawSanta();
                        drawImp();
                        drawBall();
                        drawInterface();
            };
            
            
            //On utilise "var" pour pouvoir utiliser nos setInterval dans un contexte global
            var mainTimer = setInterval(timeDown, 1000); //Timer pour décrémenter le chrono du jeu toutes les secondes 
            var addTreeTimer = setInterval(addTree, 10000); //Timer pour l'ajout d'un nouvel arbre dans la liste toutes les 10 secondes
            var treeTimingTimer = setInterval(treeTiming, 1000); //Timer pour tester toutes les secondes et supprimer les arbres qui doivent disparaître
            var impTimer = setInterval(impMoves, 50); // Timer pour créer les mouvements des lutins toutes les 50 millisecondes
            var drawTimer = setInterval(draw, 16); // Timer de dessin du jeu toutes les 16 millisecondes (62.5 fps)
            var musicTimer = setInterval(music,500); // Timer de relance de la musique principale si elle s'est terminée (teste toutes les 0.5 seconde)
           
           