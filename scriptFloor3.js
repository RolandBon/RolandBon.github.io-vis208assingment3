const c = document.getElementById("World");
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const ball = {x: 200, y: 200, radius: 20, speed: 12};

const spawn = {x: 200, y:200}

const worldW = 21500;
const worldH = 400;

const codes = {};
document.addEventListener("keydown", e => codes[e.code] = true);
document.addEventListener("keyup", e => codes[e.code] = false);

const wallsD = [
  //1. Static
  {x: 1975, y:0, width: 50, height: 200},
  {x: 2275, y:200, width: 50, height: 200},
  {x: 2575, y:0, width: 50, height: 200},
  {x: 2875, y:100, width: 50, height: 200},
  {x: 3175, y:200, width: 50, height: 200},
  {x: 3475, y:0, width: 50, height: 200},
  {x: 3775, y:0, width: 50, height: 125},
  {x: 3775, y:275, width: 50, height: 125},
  {x: 4175, y:100, width: 50, height: 300},
  {x: 4475, y:0, width: 50, height: 100},
  {x: 4475, y:225, width: 50, height: 175},
  {x: 4775, y:0, width: 50, height: 200},
  {x: 4775, y:350, width: 50, height: 50},
  {x: 9175, y:0, width: 50, height: 100},
  {x: 9175, y:300, width: 50, height: 85},
  {x: 9475, y:100, width: 50, height: 200},
  {x: 12475, y:300, width: 50, height: 100},
  {x: 12475, y:0, width: 50, height: 100},
  {x: 13075, y:100, width: 50, height: 200},
  {x: 14775, y:100, width: 50, height: 300},
  {x: 15075, y:200, width: 50, height: 200},
  {x: 15075, y:0, width: 50, height: 100},
  {x: 15375, y:300, width: 50, height: 100},
  {x: 15375, y:0, width: 50, height: 200},
  {x: 15675, y:0, width: 50, height: 300},
  {x: 15975, y:300, width: 50, height: 100},
  {x: 15975, y:0, width: 50, height: 200},
  {x: 16275, y:200, width: 50, height: 200},
  {x: 16275, y:0, width: 50, height: 100},
  {x: 16575, y:100, width: 50, height: 300},
  {x: 16975, y:0, width: 50, height: 275},
  {x: 17375, y:125, width: 50, height: 275},
  {x: 17775, y:0, width: 50, height: 275},
  {x: 18175, y:125, width: 50, height: 275},
  {x: 18475, y:200, width: 50, height: 200},
  {x: 18475, y:0, width: 50, height: 100},
  {x: 18775, y:300, width: 50, height: 100},
  {x: 18775, y:0, width: 50, height: 200},
  {x: 19075, y:0, width: 50, height: 300},
  {x: 19375, y:300, width: 50, height: 100},
  {x: 19375, y:0, width: 50, height: 200},
  {x: 19675, y:200, width: 50, height: 200},
  {x: 19675, y:0, width: 50, height: 100},
  {x: 19975, y:100, width: 50, height: 300},
]

const wallsMD = [
  //2. Moving
  {x: 6775, y:150, width: 50, height: 50, dir:-1}, //0
  {x: 6875, y:330, width: 50, height: 50, dir:-1}, //1
  {x: 7275, y:150, width: 50, height: 50, dir:1}, //2
  {x: 7375, y:330, width: 50, height: 50, dir:1}, //3
  {x: 0, y:0, width: 0, height: 0, dir:1}, //7675, 0, 50, 100, 1
  {x: 7875, y:0, width: 50, height: 100, dir:1}, //5
  {x: 8175, y:100, width: 50, height: 100, dir:1}, //6
  {x: 8375, y:100, width: 50, height: 100, dir:1}, //7
  {x: 0, y:0, width: 0, height: 0, dir:-1}, //8675, 100, 50, 100, -1
  {x: 8875, y:100, width: 50, height: 100, dir:-1}, //9
  {x: 9775, y:0, width: 50, height: 50, dir:1}, //10
  {x: 10375, y:350, width: 50, height: 50, dir:-1}, //11
  {x: 10675, y:0, width: 50, height: 50, dir:1}, //12  pair 14
  {x: 0, y:0, width: 0, height: 0, dir:1}, //13  pair 15   10975, 0, 50, 50, 1
  {x: 0, y:0, width: 0, height: 0, dir:-1}, //14  10675, 350, 50, 50
  {x: 10975, y:350, width: 50, height: 50, dir:-1}, //15   10975, 350, 50, 50, -1
  {x: 11475, y:170, width: 50, height: 50, dir:1}, //16  up down
  {x: 11775, y:300, width: 50, height: 50, dir:-1}, //17
  {x: 12075, y:150, width: 50, height: 50, dir:1}, //18
  {x: 12775, y:0, width: 50, height: 150, dir:1}, //19
  {x: 13375, y:0, width: 50, height: 150, dir:1}, //19

]

//Collision Function
function collision(wall){
  // Closest point on rectangle to ball circumference
    let closestX = Math.max(wall.x, Math.min(ball.x, wall.x + wall.width))
    let closestY = Math.max(wall.y, Math.min(ball.y, wall.y + wall.height))
  //Find distance to ball
    let distanceX = ball.x-closestX;
    let distanceY = ball.y-closestY;

    let dSquare = (distanceX * distanceX) + (distanceY * distanceY);
  // If in wall, return true
    return (dSquare <= (ball.radius * ball.radius));
}

function collisionBall(wall){
  //Find distance to ball
    let distanceX = ball.x-wall.x;
    let distanceY = ball.y-wall.y;

    let dSquare = (distanceX * distanceX) + (distanceY * distanceY); //Distance squared
    let rSum = ball.radius + wall.radius; // Sum radii
  // If in wall, return true
    return (dSquare <= (rSum * rSum));
}

function gameLoop() {
  //Autoscroll
  if((ball.x >= 1000 && ball.x <= 13850) || ball.x >= 14200) {  
  ball.speed = 12
  ball.x += ball.speed
  } 
  else {
    if (codes['ArrowLeft'] || codes['KeyA']) ball.x -= ball.speed;
    if (codes['ArrowRight'] || codes['KeyD']) ball.x += ball.speed;
    }
  
    // Movement
    //if(ball.x < 1000 || ()){
      //if (codes['ArrowLeft'] || codes['KeyA']) ball.x -= ball.speed;
      //if (codes['ArrowRight'] || codes['KeyD']) ball.x += ball.speed;
    //}
    if (codes['ArrowUp'] || codes['KeyW']) ball.y -= ball.speed;
    if (codes['ArrowDown'] || codes['KeyS']) ball.y += ball.speed;

    wallsD.forEach((wall) => {    
      if (collision(wall)) {
        ball.x = spawn.x;
        ball.y = spawn.y;
      }
    })
    wallsMD.forEach((wall) => {    
      if (collision(wall)) {
        ball.x = spawn.x;
        ball.y = spawn.y;
      }
    })

 //Next Room
     if ((ball.x >= (worldW-40)) && (ball.y >= ((worldH/2)-80) && ball.y<= ((worldH/2)+80))){
      window.location.href="Finish.html";
    } 


    if (ball.x >= 13800 && ball.x <= 14200) {
      spawn.x = 14000
    }

    //Move Walls
    for (let x = 0; x <=3; x += 1) {
      wallsMD[x].y += 5 * wallsMD[x].dir
       if (wallsMD[x].y == (180 + (wallsMD[x].dir * 170))) {
        wallsMD[x].dir = wallsMD[x].dir * (-1)
      }  
    }

    for (let x = 4; x <=9; x += 1) {
      wallsMD[x].y += 5 * wallsMD[x].dir
       if (wallsMD[x].y == (170 + (wallsMD[x].dir * 150))) {
        wallsMD[x].dir = wallsMD[x].dir * (-1)
      }  
    }

    for (let x = 10; x <=13; x += 1) {
      wallsMD[x].y += 5 * wallsMD[x].dir
      wallsMD[x].x += 5 * wallsMD[x].dir
       if (wallsMD[x].y == (180 + (wallsMD[x].dir * 170))) {
        wallsMD[x].dir = wallsMD[x].dir * (-1)
      }  
    }

    for (let x = 14; x <=15; x += 1) {
      wallsMD[x].y += 5 * wallsMD[x].dir
      wallsMD[x].x -= 5 * wallsMD[x].dir
       if (wallsMD[x].y == (180 + (wallsMD[x].dir * 170))) {
        wallsMD[x].dir = wallsMD[x].dir * (-1)
      }  
    }
    for (let x = 16; x <=18; x += 1) {
      wallsMD[x].y += 5 * wallsMD[x].dir
       if (wallsMD[x].y == (180 + (wallsMD[x].dir * 170))) {
        wallsMD[x].dir = wallsMD[x].dir * (-1)
      }  
    }

     for (let x = 19; x <=20; x += 1) {
      wallsMD[x].y += 5 * wallsMD[x].dir
       if (wallsMD[x].y == (120 + (wallsMD[x].dir * 130))) {
        wallsMD[x].dir = wallsMD[x].dir * (-1)
      }  
    }


    // Stay in Bounds
    ball.x = Math.max(ball.radius+20, Math.min(worldW-20-ball.radius, ball.x))
    ball.y = Math.max(ball.radius+20, Math.min(worldH-20-ball.radius, ball.y))

    ctx.clearRect(0, 0, c.width, c.height); // Clear last frame

    ctx.save(); // Save Data
    ctx.translate(-(ball.x - c.width/4), -(ball.y - c.height/2)); // Move camera
    

    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, worldW, worldH); //Redraw World
  
    //Lines on Floor
    ctx.strokeStyle = '#222244';
    ctx.lineWidth = 1;
     for (let x = 0; x <= worldW; x += 100) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, worldH); ctx.stroke();
    }
    for (let y = 0; y <= worldH; y += 100) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(worldW, y); ctx.stroke();
    }

    ctx.fillStyle = 'darkred';
   wallsD.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
     wallsMD.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    
    //Text
    ctx.fillStyle = '#4A0080';
    ctx.font = '100px Georgia';
      //ctx.fillText('Second Floor', 0, -50);
          //ctx.fillText("They move now!", 5300, 200);
    ctx.font = '40px Georgia';
      //ctx.fillText("All you have left to do is make it down the hallway", 0, 500);
      //ctx.fillText("to Equad Cafe and you're free!", 0, 550);
      //ctx.fillText("Cross here when you're ready", 750,-100);  
      //ctx.fillText("Here's a checkpoint!", 13825,-50); 
      //ctx.fillText("Nice!", 20500,-50); 
      //ctx.fillText("|", 990, -50);  
      ctx.font = '30px Arial';  
      //ctx.fillText("V", 988, -30);

    
    //Starting line
    ctx.fillStyle = "red";
    ctx.fillRect(990, 0, 20, 400);
    ctx.fillRect(14190, 0, 20, 400);
  
       //Check Point
    ctx.fillStyle = "green";
    ctx.fillRect(13800, 0, 400, 400);

  
    //Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.strokeRect(0, 0, worldW, worldH);

    //Entrance
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.moveTo(21500, (worldH/2)-100)
    ctx.lineTo(21720, (worldH/2)-100)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(21500, (worldH/2)+100)
    ctx.lineTo(21720, (worldH/2)+100)
    ctx.stroke();
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 160;
    ctx.beginPath();
    ctx.moveTo(21480, (worldH/2))
    ctx.lineTo(21720, (worldH/2))
    ctx.stroke();
    ctx.strokeStyle = '#222244';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(21480, (worldH/2))
    ctx.lineTo(21720, (worldH/2))
    ctx.stroke();

    //Redraw Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    //Display Position
    ctx.fillStyle = 'white';
    ctx.font = '30px Calibri';
     ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Floor 2', ball.x - 370, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('Floor 2', ball.x - 370, ball.y - 325);
    if(ball.x < 300){
       ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Last Floor!', ball.x + 1000, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText('Last Floor!', ball.x + 1000, ball.y - 325);}
    if(ball.x >= 300 && ball.x <= 1000){
 ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Cross the', ball.x + 800, ball.y - 325);
    ctx.strokeText('red line', ball.x + 920, ball.y - 325);
    ctx.strokeText('to start', ball.x + 1020, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText('Cross the', ball.x + 800, ball.y - 325);
     ctx.fillStyle = 'red';
      ctx.fillText('red line', ball.x + 920, ball.y - 325);
     ctx.fillStyle = 'white';
      ctx.fillText('to start', ball.x + 1020, ball.y - 325);
    }
     if(ball.x >= 4900 && ball.x <= 6200){
      ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('They move now...', ball.x + 900, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText('They move now...', ball.x + 900, ball.y - 325);
     }
     if(ball.x >= 13800 && ball.x <= 14200){
      ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('One last section!', ball.x + 900, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText('One last section!', ball.x + 900, ball.y - 325);
     }
  if(ball.x >= 20100){
      ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Well done!!', ball.x + 900, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText('Well done!!', ball.x + 900, ball.y - 325);
     }

    //ctx.fillText('x:' + ball.x, ball.x - 100, ball.y - 275);
    //ctx.fillText('y:' + ball.y, ball.x - 100, ball.y - 225);



    ctx.restore();

    requestAnimationFrame(gameLoop);
}
gameLoop();
