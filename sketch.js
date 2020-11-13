var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var score=0;

var sword,swordImage;

var alien,aliens,alienGroup;

var fruit1,fruit2,fruit3,fruit4,f1,f2,f3,f4,group1,group2,group3,group4;

var gameOver,gameOverImage;

var gameOverSound, knifeSound;

function preload(){
  swordImage = loadImage("sword.png");
  
  aliens = loadAnimation("alien1.png","alien2.png");
  
  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");
  
  gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwooshSound.mp3")
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(250,250,10,10);
  sword.addImage("knife",swordImage);
  sword.scale=0.5;
  
  gameOver = createSprite(250,250,10,10);
  gameOver.addImage("gameover",gameOverImage);
  
  alienGroup = createGroup();
  group1 = createGroup();
  group2 = createGroup();
  group3 = createGroup();
  group4 = createGroup();
}

function draw(){
  background("brown");
  text("Score: "+ score,430,30);
  
  if(gamestate===PLAY){
    gameOver.visible=false

    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    orange();
    apple();
     if(sword.isTouching(group1)){
       group1.destroyEach();
       score=score+1
       knifeSound.play();
     }
     if(sword.isTouching(group2)){
       group2.destroyEach();
       score=score+2
       knifeSound.play();
     }
     if(sword.isTouching(group3)){
       group3.destroyEach();
       score=score+3
       knifeSound.play();
     }
     if(sword.isTouching(group4)){
       group4.destroyEach();
       score=score+4
       knifeSound.play();
     }
     if(score>50){
       pear();
       banana();
     }
    monster();
    if(sword.isTouching(alienGroup)){
      gamestate = END;
    gameOverSound.play();
    }
  }
  if(gamestate===END){
    gameOver.visible = true;
    sword.destroy();
    alienGroup.destroyEach();
    group1.destroyEach();
    group2.destroyEach();
    group3.destroyEach();
    group4.destroyEach();
  }
  drawSprites();
}
function orange(){
  if(frameCount%60===0){
  fruit1 = createSprite(600,Math.round(random(0,500)),10,10);
  fruit1.addImage(f1);
  fruit1.scale=0.3;
  fruit1.velocityX=-(4 + 9*score);
  fruit1.velocityY = fruit1.velocityY + 0.6
  fruit1.lifetime = 150;
  group1.add(fruit1);
  }
}
function apple(){
  if(frameCount%100===0){
  fruit2 = createSprite(600,Math.round(random(0,500)),10,10);
  fruit2.addImage(f2);
  fruit2.scale=0.3;
  fruit2.velocityX=-(4 + 9*score);
  fruit2.velocityY = fruit2.velocityY + 0.6
  fruit2.lifetime = 150;
  group2.add(fruit2);
  }
}
function pear(){
  if(frameCount%140===0){
  fruit3 = createSprite(0,Math.round(random(0,500)),10,10);
  fruit3.addImage(f3);
  fruit3.scale=0.3;
  fruit3.velocityX=-(4 + 9*score);
  fruit3.velocityY = fruit3.velocityY + 0.6
  fruit3.lifetime = 150;
  group3.add(fruit3);
  }
}
function banana(){
  if(frameCount%180===0){
  fruit4 = createSprite(0,Math.round(random(0,500)),10,10);
  fruit4.addImage(f4);
  fruit4.scale=0.2;
  fruit4.velocityX=-(4 + 9*score);
  fruit4.velocityY = fruit4.velocityY + 0.6
  fruit4.lifetime = 150;
  group4.add(fruit4);
  }
}
function monster(){
  if(frameCount%50===0){
    alien = createSprite(0,Math.round(random(0,500)),10,10);
    alien.addAnimation("alien",aliens);
    alien.velocityX = 7;
    alien.lifetimee = 100;
    alienGroup.add(alien);
  }
}