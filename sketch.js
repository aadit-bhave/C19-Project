var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostStandingImg;
var invisibleBlockGroup, invisibleBlock, invisibleBlockImg;
var gameOver, gameOverImg;
var spookySound;
var score;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");

  doorImg = loadImage("door.png");

  climberImg = loadImage("climber.png");

  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");

  ghostStandingImg = loadAnimation("ghost-standing.png")

  spookySound = loadSound("scaryMusic.mp3");

  gameOverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addAnimation("ghost", ghostImg);
  ghost.scale = 0.3;
  ghost.addAnimation("standing", ghostStandingImg)

  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  doorsGroup = createGroup()
  climbersGroup = createGroup()

  score = 0;
 //spookySound.play();
}

function draw() {
  background(200);
  
 //console.log(score);
 // console.log(ghost.x);
 // console.log(ghost.y);

  if(gameState == "play") {

    if(keyDown("space")) {
      ghost.velocityY = -10;
    }

    if(keyDown("right_arrow")) {
      ghost.x += 5;
    }
 
    if(keyDown("left_arrow"))  {
      ghost.x -= 5;
    }

    //gravity
    ghost.velocityY += 0.8;

    //score
    score = score + Math.round(getFrameRate()/60);
    //door.velocityY = 8 + score/100;

    
    //boundary limits
    if(ghost.y < 0 ) {
      ghost.y = 0;
    }


    if(ghost.y >= 550) {
      ghost.y = 550;
    }

    if(ghost.x < 100) {
      ghost.x = 100;
    }

    if(ghost.x > 500) {
      ghost.x = 500;
    }

  
  if(tower.y > 400){
      tower.y = 300;
    }

  spawnDoors()


  if(doorsGroup.isTouching(ghost) || climbersGroup.isTouching(ghost)) {
    gameState = "over";
  }


 }

 else if(gameState === "over") {
  ghost.velocityY = 0;
  tower.velocityY = 0;

  if(keyDown("right_arrow") || keyDown("left_arrow")) {
    ghost.x += 0;
  }

  ghost.changeAnimation("standing",ghostStandingImg);
  gameOver.visible = true;

  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  
}


 drawSprites()
 fill ("red")
 text("Score : " + score, 500,100);
 
 }
  
 function spawnDoors() {
  if(frameCount%80 === 0) {
    door = createSprite(200,-50, 10,40)
    door.velocityY = 9;
    door.addImage(doorImg);
    door.y = -5;
    door.x = Math.round(random(100,500))
    door.lifetime = 70; 
    
   

     climber = createSprite(200,0)
     climber.addImage("climber", climberImg);
     climber.velocityY = 9;
    climber.x = door.x;
    climber.lifetime = 70;
    climber.y = door.y +50;
    doorsGroup.add(door);
    climbersGroup.add(climber);

    door.velocityY = climber.velocityY; 
  }
}

