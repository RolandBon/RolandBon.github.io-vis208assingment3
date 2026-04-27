const c = document.getElementById("World");
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const ball = {x: 500, y: 300, radius: 20, speed: 7};

let spawn = {x:500, y:300, point: 0};

const worldW = 4000;
const worldH = 4000;
const wall = 20;

const codes = {};
document.addEventListener("keydown", e => codes[e.code] = true);
document.addEventListener("keyup", e => codes[e.code] = false);

const walls = [
    {x: 1000, y: 500, width: 2000, height: 100},//Inner
    {x: 1000, y: 500, width: 100, height: 2500},//Inner
    {x: 3000, y: 500, width: 100, height: 2600},//Inner
    {x: 1000, y: 3000, width: 2000, height: 100},//Inner
    {x: 1025, y: 0, width: 50, height: 500}, //Start right
    {x: 1000, y: 3500, width: 3000, height: 50}, //Bottom tunnel
    {x: 1000, y: 3500, width: 50, height: 500} //Bottom tunnel
]
//Obstacles
const wallsD = [
  //Begin Left
    {x: 100, y: 1000, width: 200, height: 50, dir: 1},//0
    {x: 800, y: 1200, width: 200, height: 50, dir: -1},//1
    {x: 100, y: 1400, width: 200, height: 50, dir: 1},//2
    {x: 800, y: 1600, width: 200, height: 50, dir: -1},//3
    {x: 100, y: 1800, width: 200, height: 50, dir: 1},//4
    {x: 800, y: 2000, width: 200, height: 50, dir: -1},//5
    {x: 100, y: 2200, width: 200, height: 50, dir: 1},//6
    {x: 800, y: 2400, width: 200, height: 50, dir: -1},//7
    {x: 100, y: 2600, width: 200, height: 50, dir: 1},//8
    {x: 800, y: 2800, width: 200, height: 50, dir: -1},//9
    {x: 100, y: 3000, width: 200, height: 50, dir: 1},//10
    {x: 100, y: 1300, width: 50, height: 50, dir: 1}, //small 11
    {x: 100, y: 2300, width: 50, height: 50, dir: 1}, //small 12
    {x: 900, y: 2000, width: 50, height: 50, dir: -1}, //small 13
    {x: 900, y: 3000, width: 50, height: 50, dir: -1}, //small 14
    {x: 100, y: 1800, width: 50, height: 50, dir: 1},  //small 15
    {x: 100, y: 2800, width: 50, height: 50, dir: 1},  //small 16
    //Begin bottom
    {x: 1000, y: 3125, width: 50, height: 50, dir: 1}, //small 17
    {x: 2000, y: 3225, width: 50, height: 50, dir: -1}, //small 18
    {x: 1000, y: 3325, width: 50, height: 50, dir: 1},  //small 19
    {x: 2000, y: 3425, width: 50, height: 50, dir: -1},  //small 20
    {x: 2000, y: 3125, width: 50, height: 50, dir: 1}, //small 21
    {x: 3000, y: 3225, width: 50, height: 50, dir: -1}, //small 22
    {x: 2000, y: 3325, width: 50, height: 50, dir: 1},  //small 23
    {x: 3000, y: 3425, width: 50, height: 50, dir: -1},  //small 24
    {x: 3025, y: 3100, width: 50, height: 50, dir: 1},  //small 25
    //Begin Right
    {x: 3100, y: 1000, width: 200, height: 50, dir: 1},//26
    {x: 3800, y: 1200, width: 200, height: 50, dir: -1},//27
    {x: 3100, y: 1400, width: 200, height: 50, dir: 1},//28
    {x: 3800, y: 1600, width: 200, height: 50, dir: -1},//29
    {x: 3100, y: 1800, width: 200, height: 50, dir: 1},//30
    {x: 3800, y: 2000, width: 200, height: 50, dir: -1},//31
    {x: 3100, y: 2200, width: 200, height: 50, dir: 1},//32
    {x: 3800, y: 2400, width: 200, height: 50, dir: -1},//33
    {x: 3100, y: 2600, width: 200, height: 50, dir: 1},//34
    {x: 3800, y: 2800, width: 200, height: 50, dir: -1},//35
    {x: 3100, y: 3000, width: 200, height: 50, dir: 1},//36
    {x: 3800, y: 600, width: 200, height: 50, dir: -1},//37
    {x: 3100, y: 800, width: 200, height: 50, dir: 1}//38

]

//Obstacle Balls
const ballsD = [
{x: 3300, y: 2900, radius: 20, dir: 1}, //0
{x: 3800, y: 2900, radius: 20, dir: 1}, //1
{x: 3550, y: 2550, radius: 180, dir: -1}, //2
{x: 3300, y: 2200, radius: 20, dir: 1}, //3
{x: 3800, y: 2200, radius: 20, dir: 1}, //4
{x: 3550, y: 1850, radius: 180, dir: -1}, //5
{x: 3300, y: 1500, radius: 20, dir: 1}, //6
{x: 3800, y: 1500, radius: 20, dir: 1}, //7
{x: 3550, y: 1150, radius: 180, dir: -1}, //8
{x: 3300, y: 800, radius: 20, dir: 1}, //9
{x: 3800, y: 800, radius: 20, dir: 1}, //10
{x: 3550, y: 450, radius: 180, dir: -1}, //11
]
const keys = [0, 0, 0]

const gates = [
  {x: 2000, y:0, width:50, height: 1000, key: 0},
  {x: 1800, y:0, width:50, height: 1000, key: 0},
  {x: 1600, y:0, width:50, height: 1000, key: 0},
]

const menu = 0;

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
    const prevX = ball.x;
    const prevY = ball.y;
    // Movement
    if (codes['ArrowUp'] || codes['KeyW']) ball.y -= ball.speed;
    if (codes['ArrowLeft'] || codes['KeyA']) ball.x -= ball.speed;
    if (codes['ArrowDown'] || codes['KeyS']) ball.y += ball.speed;
    if (codes['ArrowRight'] || codes['KeyD']) ball.x += ball.speed;


    //Collision Detection
      walls.forEach((wall) => {    
      if (collision(wall)) {
        ball.x = prevX; 
        ball.y = prevY; 
      }
    } )

     wallsD.forEach((wall) => {    
      if (collision(wall)) {
        ball.x = spawn.x; 
        ball.y = spawn.y;
        if (spawn.point <=3) {
          keys[1] = 0
          keys[2] = 0}
        if (spawn.point <=1) {keys[0] = 0}

      }
    } )
    ballsD.forEach((wall) => {    
      if (collisionBall(wall)) {
        ball.x = spawn.x; 
        ball.y = spawn.y; 
        if (spawn.point <=3) {
          keys[1] = 0
          keys[2] = 0}
        if (spawn.point <=1) {keys[0] = 0}
      }
    } )

    //Next Room
     if ((ball.y <= (ball.radius+20)) && (ball.x >= ((worldW/2)-80 - 700) && ball.x<= ((worldW/2)+80 - 700))) {
      window.location.href="Floor3.html";
    } 

    // Stay in Bounds
    ball.x = Math.max(ball.radius+wall, Math.min(worldW-wall-ball.radius, ball.x))
    ball.y = Math.max(ball.radius+wall, Math.min(worldH-wall-ball.radius, ball.y))

    ctx.clearRect(0, 0, c.width, c.height); // Clear last frame

    ctx.save(); // Save Data
    ctx.translate(-(ball.x - c.width/2), -(ball.y - c.height/2)); // Move camera

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
    
    //Move walls Left Side
    for (let x = 0; x <=10; x += 1) {
      wallsD[x].x += 10 * wallsD[x].dir
       if (wallsD[x].x == (400 + (wallsD[x].dir * 400))) {
        wallsD[x].dir = wallsD[x].dir * (-1)
      }  
    }
    for (let x = 11; x <=14; x += 1) {
      wallsD[x].x += 10 * wallsD[x].dir
      wallsD[x].y += 10 * wallsD[x].dir
       if (wallsD[x].x == (500 + (wallsD[x].dir * 500))) {
        wallsD[x].dir = wallsD[x].dir * (-1)
      }  
    }
    for (let x = 15; x <=16; x += 1) {
      wallsD[x].x += 10 * wallsD[x].dir
      wallsD[x].y -= 10 * wallsD[x].dir
       if (wallsD[x].x == (500 + (wallsD[x].dir * 500))) {
        wallsD[x].dir = wallsD[x].dir * (-1)
      }  
    }

    //Move walls Bottom Side
    for (let x = 17; x <=20; x += 1) {
      wallsD[x].x += 10 * wallsD[x].dir
       if (wallsD[x].x == (1500 + (wallsD[x].dir * 500))) {
        wallsD[x].dir = wallsD[x].dir * (-1)
      }  
    }
    for (let x = 21; x <=24; x += 1) {
      wallsD[x].x += 10 * wallsD[x].dir
       if (wallsD[x].x == (2500 + (wallsD[x].dir * 500))) {
        wallsD[x].dir = wallsD[x].dir * (-1)
      }  
    }
    for (let x = 25; x <=25; x += 1) {
      wallsD[x].y += 10 * wallsD[x].dir
       if (wallsD[x].y == (3300 + (wallsD[x].dir * 200))) {
        wallsD[x].dir = wallsD[x].dir * (-1)
      }  
    }

    //Move wall Right Side
    for (let x = 26; x <=38; x += 1) {
      wallsD[x].x += 10 * wallsD[x].dir
       if (wallsD[x].x == (3450 + (wallsD[x].dir * 350))) {
        wallsD[x].dir = wallsD[x].dir * (-1)
      }  
    }
    for (let x = 0; x <=11; x+=1) {
      ballsD[x].radius += 1 * ballsD[x].dir
      if(ballsD[x].radius == (110 + (ballsD[x].dir * 90))){
        ballsD[x].dir = ballsD[x].dir * (-1);
      } 

    }

    //Gates
    if(collision(gates[0])){
       if(keys[0] == 0) {
        ball.x = prevX; 
        ball.y = prevY; 
       }
      if(keys[0] == 1){
        gates[0].x = 0;
        gates[0].y = 0;
        gates[0].width = 0;
        gates[0].height = 0;
        keys[0] = 2

      } 
    }
    if(collision(gates[1])){
       if(keys[1] == 0) {
        ball.x = prevX; 
        ball.y = prevY; 
       }
      if(keys[1] == 1){
        gates[1].x = 0;
        gates[1].y = 0;
        gates[1].width = 0;
        gates[1].height = 0;
        keys[1] = 2

      } 
    }
    if(collision(gates[2])){
       if(keys[2] == 0) {
        ball.x = prevX; 
        ball.y = prevY; 
       }
      if(keys[2] == 1){
        gates[2].x = 0;
        gates[2].y = 0;
        gates[2].width = 0;
        gates[2].height = 0;
        keys[2] = 2

      } 
    }
      ctx.fillStyle = 'yellow';
    ctx.fillRect(gates[0].x, gates[0].y, gates[0].width, gates[0].height);
      ctx.fillStyle = 'lightgreen';
    ctx.fillRect(gates[1].x, gates[1].y, gates[1].width, gates[1].height);
      ctx.fillStyle = 'orange';
    ctx.fillRect(gates[2].x, gates[2].y, gates[2].width, gates[2].height);


    //Walls
        ctx.fillStyle = 'black';
    walls.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    ctx.fillStyle = 'darkred';
   wallsD.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    ballsD.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
      ctx.fill();
    });
  
    // Spawn Points
    ctx.fillStyle = 'green';
    ctx.fillRect(400, 700, 200, 200);
    if ((ball.x >= 400 && ball.x <= 600) && (ball.y >= 700 && ball.y <= 900)) {
        spawn = {x:500, y:800, point:1};
    }
      ctx.fillRect(600, 3200, 200, 200);
    if ((ball.x >= 600 && ball.x <= 800) && (ball.y >= 3200 && ball.y <= 3400)) {
        spawn = {x: 700, y: 3300, point:2}
    }
    ctx.fillRect(3400, 3200, 200, 200);
    if ((ball.x >= 3400 && ball.x <= 3600) && (ball.y >= 3200 && ball.y <= 3400)) {
        spawn = {x: 3500, y: 3300, point:3}
    }
    ctx.fillRect(3000, 200, 200, 200);
    if ((ball.x >= 3000 && ball.x <= 3200) && (ball.y >= 200 && ball.y <= 400)) {
        spawn = {x: 3100, y: 300, point:4}
    }
    
    //Keys
    if (keys[0] == 0) {
    ctx.beginPath();
    ctx.arc(500, 3750, 25, 0, 2*Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.fillRect(490, 3750, 20, 100)
    ctx.fillRect(460, 3820, 40, 10)
    ctx.fillRect(460, 3840, 40, 10)
     if ((ball.x >= 470 && ball.x <= 530) && (ball.y >= 3725 && ball.y <= 3850)) {
        keys[0] = 1;
    }
  }
    if (keys[0] == 1) {
    ctx.beginPath();
    ctx.arc(ball.x - 25, ball.y - 25, 10, 0, 2*Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    }

    if (keys[1] == 0) {
    ctx.beginPath();
    ctx.arc(3550, 2200, 25, 0, 2*Math.PI);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.fillRect(3540, 2200, 20, 100)
    ctx.fillRect(3510, 2270, 40, 10)
    ctx.fillRect(3510, 2290, 40, 10)
     if ((ball.x >= 3520 && ball.x <= 3580) && (ball.y >= 2175 && ball.y <= 2300)) {
        keys[1] = 1;
    }
  }
    if (keys[1] == 1) {
    ctx.beginPath();
    ctx.arc(ball.x - 25, ball.y + 25, 10, 0, 2*Math.PI);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    }
   if (keys[2] == 0) {
    ctx.beginPath();
    ctx.arc(3550, 1500, 25, 0, 2*Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.fillRect(3540, 1500, 20, 100)
    ctx.fillRect(3510, 1570, 40, 10)
    ctx.fillRect(3510, 1590, 40, 10)
     if ((ball.x >= 3520 && ball.x <= 3580) && (ball.y >= 1475 && ball.y <= 1600)) {
        keys[2] = 1;
    }
  }
    if (keys[2] == 1) {
    ctx.beginPath();
    ctx.arc(ball.x + 25, ball.y - 25, 10, 0, 2*Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();
    }



      //Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.strokeRect(0, 0, worldW, worldH);

      //Background areas
    ctx.fillStyle = 'lightblue';
      ctx.fillRect(1100, 600, 1900, 2400);
      ctx.fillRect(1050, 3550, 3000, 500);



    //Entrance
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.moveTo((worldW/2)-100 - 700, -200)
    ctx.lineTo((worldW/2)-100 - 700, 20)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo((worldW/2)+100 - 700, -200)
    ctx.lineTo((worldW/2)+100 - 700, 20)
    ctx.stroke();
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 160;
    ctx.beginPath();
    ctx.moveTo((worldW/2) - 700, -200)
    ctx.lineTo((worldW/2) - 700, 20)
    ctx.stroke();
    ctx.strokeStyle = '#222244';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo((worldW/2) - 700, -200)
    ctx.lineTo((worldW/2) - 700, 20)
    ctx.stroke();
 
  
    //Redraw Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.on

    //Display Position
    ctx.fillStyle = '#4A0080';
    ctx.font = '30px Georgia';
       ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Floor 1', ball.x - 750, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('Floor 1', ball.x - 750, ball.y - 325);
    if(ball.y >= 400 && ball.y <= 950 && ball.x <= 1000){
      ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Hit the', ball.x + 400, ball.y - 325);
    ctx.strokeText('green checkpoints!', ball.x + 500, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText('Hit the', ball.x + 400, ball.y - 325);
      ctx.fillStyle = 'green'
      ctx.fillText('green checkpoints!', ball.x + 500, ball.y - 325);
    }
    if(ball.y >= 3150 && ball.x <= 1000){
         ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("Don't forget the key below!", ball.x + 400, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText("Don't forget the key below!", ball.x + 400, ball.y - 325);
    }
    if(ball.y >= 3100 && ball.x >= 3100){
         ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("You're almost there!", ball.x + 400, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText("You're almost there!", ball.x + 400, ball.y - 325);
    }
    if(ball.x >= 3000 && ball.y <= 500){
         ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("Good Job!!", ball.x + 600, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText("Good Job!!", ball.x + 600, ball.y - 325);
    }
    if(ball.x < 3000 && ball.x >= 2200 && ball.y <= 500){
         ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("I hope you grabbed your keys...", ball.x + 300, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText("I hope you grabbed your keys...", ball.x + 300, ball.y - 325);
    }

    //ctx.fillText('x:' + ball.x, ball.x - 750, ball.y - 275);
    //ctx.fillText('y:' + ball.y, ball.x - 750, ball.y - 225);
    ctx.restore();

    requestAnimationFrame(gameLoop);
}
gameLoop();
