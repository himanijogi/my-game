var pirate,savior,saviorImg
var boat,ship 
var ground,island,invisibleGround
var iceberg1,iceberg2,iceberg3
var gameState="form"
var pirate_A
var  score = 0
var play,restart

function preload(){
  groundImage = loadImage("ground.png");
 //islandImage = loadImage("island.png");
pirate_A = loadAnimation("pirate.png","pirate2.png");
//pirate_A = loadImage("pirate.png");
//obstacle1 = loadImage("boat.png");
iceberg1 = loadImage("iceberg1.png");
iceberg2 = loadImage("iceberg2.png");
iceberg3 = loadImage("iceberg3.png");
boatImg = loadImage("heroboat.png")
restartImg = loadImage("restart.png");
saviorImg = loadImage("savior.png");
}

function setup() {
  createCanvas(600, 400);

  restart = createSprite(300,400,50,10);
   restart.addImage(restartImg);
   restart.scale =0.1
  

  ground = createSprite(300,280,800,50);
   ground.addImage(groundImage);

   ship = createSprite(500,300,20,50);
   ship.addImage(boatImg);
   ship.scale=0.7

   pirate = createSprite(500,250,20,20);
 pirate.addAnimation(pirate_A);
 // pirate.addImage(pirate_A);
   pirate.scale=0.2

   boat = createSprite(50,400,10,10);
   boat.addImage(boatImg);

   savior = createSprite(50,350,10,10);

   invisibleGround = createSprite(300,400,1000,10);
   invisibleGround.visible = false;

   obstaclesGroup = createGroup();
   pirate.depth = ship.depth;
   ship.depth = ship.depth + 1;
  // savior.y = boat.y

   if(gameState==="form"){
        restart.visible = false;
        g=new Game()
        g.State=0
       play_button= new Form()
       play_button.display();
       //gameState="play"
       
       }
}

function draw() {
  background("white");
  obstaclesGroup.debug = true
 // boat.debug = true
 //savior.velocityY = savior.velocityY + 0.8
  boat.setCollider("rectangle",0,0,200,50);
  text("Score: "+ score, 500,50);


if(g.State==1){
gameState="play"
}
  if(gameState === "play"){
       // play_button.button.visible=false;
    
        play_button.hide();
       score = score + Math.round(getFrameRate()/30);
  ground.velocityX = -10;
 
  restart.visible = false;

 // savior.y = boat.y
  
  savior.addImage(saviorImg);
  savior.scale=0.2
  savior.velocityY = savior.velocityY + 0.8

  if (ground.x < 100){
    ground.x = ground.width/2;
  }
  boat.velocityY = boat.velocityY + 0.8
  if(keyDown(38)&& boat.y >= 190){
        boat.velocityY = -9;
        boat.scale = boat.scale-0.1; 
       // boat.y = boat.y-0.02; 
       // jumpSound.play();
    }
    if(boat.y>=100){
        boat.scale =0.5
       
    }
    boat.collide(invisibleGround)
    savior.collide(boat)
  obstaclesGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(-8);

  if(boat.isTouching(obstaclesGroup)||savior.isTouching(obstaclesGroup)){
        //trex.velocityY = -12;
      //  jumpSound.play();
       gameState = "end";
        //dieSound.play()
        g.State=2
    }
drawSprites();
spawnObstacles()
spawnObstacles2()
}
 else if (gameState === "end") {
        ground.velocityX = 0;
        boat.velocityY = 0
        //g.State=2
       // restart = createSprite(300,400,50,10);


       // restart.addImage(restartImg);
       restart.visible = true;
       text("Game Over",300,200)
       text("click here to replay",300,250)

       restart.scale =0.5

       if(mousePressedOver(restart)) {
        reset();
      }
      
      obstaclesGroup.setLifetimeEach(-1);
     // cloudsGroup.setLifetimeEach(-1);
       
       obstaclesGroup.setVelocityXEach(0);
       //cloudsGroup.setVelocityXEach(0);    
 }

  
}

function reset(){
        gameState ="play"
      obstaclesGroup.destroyEach();
      obstaclesGroup.destroyEach();
       // cloudsGroup.destroyEach();
       // trex.changeAnimation("running", trex_running);
        score=0
      }


function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,150,150,120);
    obstacle.velocityX = -6
   // obstacle.debug = true
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(iceberg1);
               break;
       case 2: obstacle.addImage(iceberg1);
               break;
       case 3: obstacle.addImage(iceberg3);
               break;
       case 4: obstacle.addImage(iceberg1);
               break;
       case 5: obstacle.addImage(iceberg3);
               break;
       case 6: obstacle.addImage(iceberg3);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.3;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
       
  }
 }



 function spawnObstacles2(){
  if (frameCount % 80 === 0){
    var obstacle = createSprite(600,350,150,100);
    obstacle.velocityX = -6
  //  obstacle.debug = true
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(iceberg3);
               break;
       case 2: obstacle.addImage(iceberg3);
               break;
       case 3: obstacle.addImage(iceberg1);
               break;
       case 4: obstacle.addImage(iceberg3);
               break;
       case 5: obstacle.addImage(iceberg1);
               break;
       case 6: obstacle.addImage(iceberg1);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }

 