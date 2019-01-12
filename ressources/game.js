
            let cs = document.getElementById("cv");
            let ctx = cs.getContext("2d");
            
            //Selectionner la ligne de l'image du père noël
            let directionY = {"ArrowUp" : 15, "ArrowRight" : 110,"ArrowDown" : 210,"ArrowLeft" : 310};
            //Selectionner la colonne de l'image du père noël 
            let directionX = {"ArrowLeft" : 0, "ArrowMidle" : 75,"ArrowRight" : 150};
            
            
            
            //sx, sy correspondent respectivement à la colonne et la ligne de l'image du père noël pour choisir sa posture
            let sy = directionY.ArrowDown;
            let sx = directionX.ArrowMidle;
            
            //x,y corespondent aux coordonées sur l'image de fond
            let x = 0;
            let y = 0;
            
            //Les 4 entiers qui suivent permettre de se repérer pour choisir la bonne posture du père noël
            let nbDown = 0;
            let nbUp = 0;
            let nbLeft = 0;
            let nbRight = 0;
            
            let nbTemps = 0;
            
            //Fonction pour dessiner le père noël
            let drawSanta = function(){
            ctx.drawImage(santa,sx,sy,75,100,x,y,70,85);
            };
            
            //Fonction pour dessiner le fond notre texture
            let drawTexture = function(){
            ctx.drawImage(texture,0,0,800,600);
            };
            
            let pos = [];
            let i = 0;
            //Fonction pour positionner aléatoirement un arbre
            let drawTree = function(){
                        let posx = Math.floor(Math.random() * 800);
                        let posy = Math.floor(Math.random() * 600);
                        pos.push(posx,posy);
                        setInterval(drawTree, 10000);
            };
            
            //On récupère la texture puis on l'insère dans une variable utilisable de type image
            let texture = new Image();
            texture.src = "texture.jpg";
            texture.onload = drawTexture;
            
            //On récupère l'image avec les différentes postures du père noël puis on l'insère dans une variable utilisable de type image
            let santa = new Image();
            santa.src = "santa.png";
            santa.onload = drawSanta;
            
            //On récupère l'image avec les arbres puis on l'insère dans une variable utilisable de type image
            let tree = new Image();
            tree.src = "tree.png";
            tree.onload = drawTree;
            
            


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
                        
                        if(y === 600 ){
                                    y =0; //Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    y+=8;
                        }
                    }
                    else if(nbDown %3 ===0 ){
                        sx = directionX.ArrowRight;
                        if(y === 600 ){
                                    y =0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    y+=8;
                        }
                    }
                    else{
                        sx = directionX.ArrowLeft;
                        if(y === 600 ){
                                    y =0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    y+=8;
                        }
                        
                    }
                    
                }
                
                //Cas du clic avec la flèche du haut
                else if(e.key==="ArrowUp"){
                        nbUp++;
                        //Suivant la valeur de nbUp on désside de la posture qu'aura le père noël en modifiant sx
                    if(nbUp %2 ===0 ){
                        sx = directionX.ArrowMidle;
                        if(y === 0 ){
                                    y =600;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    y-=8;
                        }
                        
                    }
                    else if(nbUp %3 ===0 ){
                        sx = directionX.ArrowRight;
                        if(y === 0 ){
                                    y =600;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    y-=8;
                        }
                    }
                    else{
                        sx = directionX.ArrowLeft;
                        if(y === 0 ){
                                    y =600;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    y-=8;
                        }
                    }
                    
                }
                
                //Cas du clic avec la flèche de gauche
                else if(e.key==="ArrowLeft"){
                        nbLeft++;
                        //Suivant la valeur de nbLeft on désside de la posture qu'aura le père noël en modifiant sx
                    if(nbLeft %2 ===0 ){
                        sx = directionX.ArrowMidle;
                        if(x === 0 ){
                                    x =800;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    x-=8;
                        }
                        
                    }
                    else if(nbLeft %3 ===0 ){
                        sx = directionX.ArrowRight;
                        if(x === 0 ){
                                    x =800;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    x-=8;
                        }
                        
                    }
                    else{
                        sx = directionX.ArrowLeft;
                        if(x === 0 ){
                                    x =800;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                    x-=8;
                        }
                    }
            
                }
                
                //Cas du clic avec la flèche de droite 
                else if(e.key==="ArrowRight"){
                        nbRight++;
                        //Suivant la valeur de nbRight on désside de la posture qu'aura le père noël en modifiant sx
                    if(nbRight %2 ===0 ){
                        sx = directionX.ArrowMidle;
                         if(x === 800){
                                    x=0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                   x+=8;
                        }
                    }
                    else if(nbRight %3 ===0 ){
                        sx = directionX.ArrowRight;
                         if(x === 800){
                                    x=0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                   x+=8;
                        }
                    }
                    else{
                        sx = directionX.ArrowLeft;
                         if(x === 800 ){
                                    x=0;//Permet de limiter le père noël dans l'aire de jeu 
                        }
                        else{
                                   x+=8;
                        }
                    }
                    
                }
                
                //Après le clic on redessine le fond, le père noël et les arbres 
                //ctx.clearRect(0,0,800,800);
            drawTexture();
            drawSanta();
            i=0;
            while(i < pos.length){
                        ctx.drawImage(tree,0,400,100,150,pos[i],pos[i+1],90,120);
                        i++;
            }
            };
           