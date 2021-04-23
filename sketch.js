var backImage,backgr;
var player, player_running;
var ground,ground_img,BananaImg;
var obstacleImage;
var obstacleImageGroup;
var bananagroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  BananaImg = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  bananagroup = new Group();
  obstacleImageGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(bananagroup.isTouching(player)){
      bananagroup.destroyEach();
      player.scale += + 0.01;
      score = score+1;
    }

    spawnBananas();
    spawnObstacles();

  }


  drawSprites();
}

function spawnBananas(){
  if(frameCount % 90 == 0){
    var bananas = createSprite(200,200,50,50);
    bananas.addImage(BananaImg);
    bananas.scale = 0.05;
    bananas.velocityX = -4.5;
    bananas.y = random(120,150);
    bananas.lifetime = 200;
    player.depth = bananas.depth+1;
    bananagroup.add(bananas);

  } 
}     

  function spawnObstacles(){
    if(frameCount % 120  == 0){
      var  obstacle = createSprite(800,360,50,50);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.15;
      obstacle.velocityX = -4.5;
      obstacle.lifetime = 200;
      obstacleImageGroup.add(obstacle);
    }
  }

