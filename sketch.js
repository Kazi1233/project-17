var PLAY=1;
var END=0;
var gameState=1;

var sword;
var swordImage ;
var fruit1,fruit2,fruit3,fruit4;
var fruit1Image,fruit2Image,fruit3Image,fruit4Image;
var alien,alienImage;
var gameOver,gameOverImage;


function preload(){
  
  swordImage = loadImage("sword.png");
 fruit1Image  = loadImage("fruit1.png");
 fruit2Image = loadImage("fruit2.png");
 fruit3Image = loadImage("fruit3.png");
 fruit4Image = loadImage("fruit4.png");
 gameOverImage=loadImage("gameover.png") 
alienImage = loadAnimation("alien1.png","alien2.png"); 

}


function setup() {
  createCanvas(500, 500);
  
   sword= createSprite(300,300,20,50)
  
  sword.addImage("sword",swordImage)

  score=0;
  fruitGroup=createGroup();
  alienGroup=createGroup();
}

function draw() {
  background("green");
  
  if(gameState===PLAY){
    fruits();
    alien();
    sword.x=mouseX;
  sword.y=mouseY;
  
     if(fruitGroup.isTouching(sword)){    
    fruitGroup.destroyEach();
    score=score+2;
  }
  
  else
    {
      if(alienGroup.isTouching(sword)){
        gameState=END;

        fruitGroup.destroyEach();
        alienGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        alienGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage);
        sword.scale=0
        sword.x=300;
        sword.y=300;
      }
      if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
            }
      
    }
      
  }
  
  drawSprites();
  
 
  textSize(30);
  text("Score "+ score,250,50);
  }





function fruits(){
  if(World.frameCount % 80 === 0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
    
    if(position==1)
    {
    fruit.x=500;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      

      fruit.velocityX= (7+(score/4));
      }
    }
   
    
     r = Math.round(random(1,4));
  if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r==2) {
      fruit.addImage(fruit2Image);
    } else if (r==3) {
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    
    fruit.y = Math.round(random(50,550));
    
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function alien(){
  if(World.frameCount % 200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",alienImage);
    monster.y = Math.round(random(80,450));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    alienGroup.add(monster);
  }
}