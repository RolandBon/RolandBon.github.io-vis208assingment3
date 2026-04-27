const c = document.getElementById("World");
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const ball = {x: 1000, y: 200, radius: 20, speed: 7};

const worldW = 2000;
const worldH = 2000;
const wall = 20;

const codes = {};
document.addEventListener("keydown", e => codes[e.code] = true);
document.addEventListener("keyup", e => codes[e.code] = false);

const walls = [
  {x: 0, y: 580, width: 700, height: 40}, //1
  {x: 1300, y: 580, width: 700, height: 40}, //2
  {x: 680, y: 0, width: 40, height: 400}, //3
  {x: 1280, y: 0, width: 40, height: 400}, //4
  {x: 130, y: 95, width: 440, height: 10}, //4
  {x: 1430, y: 95, width: 440, height: 10}, //4
  {x: 130, y: 945, width: 340, height: 10}, //4
  {x: 1530, y: 945, width: 340, height: 10}, //4
  {x: 130, y: 1095, width: 340, height: 10}, //4
  {x: 1530, y: 1095, width: 340, height: 10}, //4
  {x: 590, y: 800, width: 20, height: 400}, //5
  {x: 1390, y: 800, width: 20, height: 400}, //5
  {x: 590, y: 1400, width: 20, height: 400}, //5
  {x: 1390, y: 1400, width: 20, height: 400}, //5
   {x: 0, y: 990, width: 600, height: 20}, //5
  {x: 1390, y: 990, width: 600, height: 20}, //5
   {x: 0, y: 1590, width: 600, height: 20}, //5
  {x: 1390, y: 1590, width: 600, height: 20}, //5
]
//Tables
const wallsB = [
  //Room 1
  {x: 135, y: 335, width: 30, height: 30}, //4 
  {x: 235, y: 335, width: 30, height: 30}, //4
  {x: 335, y: 335, width: 30, height: 30}, //4
  {x: 435, y: 335, width: 30, height: 30}, //4
  {x: 535, y: 335, width: 30, height: 30}, //4
  {x: 135, y: 435, width: 30, height: 30}, //4
  {x: 235, y: 435, width: 30, height: 30}, //4
  {x: 335, y: 435, width: 30, height: 30}, //4
  {x: 435, y: 435, width: 30, height: 30}, //4
  {x: 535, y: 435, width: 30, height: 30}, //4
    //Room 2
  {x: 1435, y: 335, width: 30, height: 30}, //4 
  {x: 1535, y: 335, width: 30, height: 30}, //4
  {x: 1635, y: 335, width: 30, height: 30}, //4
  {x: 1735, y: 335, width: 30, height: 30}, //4
  {x: 1835, y: 335, width: 30, height: 30}, //4
  {x: 1435, y: 435, width: 30, height: 30}, //4
  {x: 1535, y: 435, width: 30, height: 30}, //4
  {x: 1635, y: 435, width: 30, height: 30}, //4
  {x: 1735, y: 435, width: 30, height: 30}, //4
  {x: 1835, y: 435, width: 30, height: 30}, //4
  //Room 3
  {x: 135, y: 685, width: 30, height: 30}, //4 
  {x: 235, y: 685, width: 30, height: 30}, //4
  {x: 335, y: 685, width: 30, height: 30}, //4
  {x: 435, y: 685, width: 30, height: 30}, //4
  {x: 135, y: 785, width: 30, height: 30}, //4
  {x: 235, y: 785, width: 30, height: 30}, //4
  {x: 335, y: 785, width: 30, height: 30}, //4
  {x: 435, y: 785, width: 30, height: 30}, //4
  //Room 4
  {x: 1535, y: 685, width: 30, height: 30}, //4 
  {x: 1635, y: 685, width: 30, height: 30}, //4
  {x: 1735, y: 685, width: 30, height: 30}, //4
  {x: 1835, y: 685, width: 30, height: 30}, //4
  {x: 1535, y: 785, width: 30, height: 30}, //4
  {x: 1635, y: 785, width: 30, height: 30}, //4
  {x: 1735, y: 785, width: 30, height: 30}, //4
  {x: 1835, y: 785, width: 30, height: 30}, //4
  //Room 5
  {x: 135, y: 1335, width: 30, height: 30}, //4 
  {x: 235, y: 1335, width: 30, height: 30}, //4
  {x: 335, y: 1335, width: 30, height: 30}, //4
  {x: 435, y: 1335, width: 30, height: 30}, //4
  {x: 135, y: 1435, width: 30, height: 30}, //4
  {x: 235, y: 1435, width: 30, height: 30}, //4
  {x: 335, y: 1435, width: 30, height: 30}, //4
  {x: 435, y: 1435, width: 30, height: 30}, //4
  //Room 2
  {x: 1535, y: 1335, width: 30, height: 30}, //4
  {x: 1635, y: 1335, width: 30, height: 30}, //4
  {x: 1735, y: 1335, width: 30, height: 30}, //4
  {x: 1835, y: 1335, width: 30, height: 30}, //4
  {x: 1535, y: 1435, width: 30, height: 30}, //4
  {x: 1635, y: 1435, width: 30, height: 30}, //4
  {x: 1735, y: 1435, width: 30, height: 30}, //4
  {x: 1835, y: 1435, width: 30, height: 30}, //4
]
//chalk
const wallsW = [
  {x: 360, y: 130, width: 5, height: 10}, //1
  {x: 1660, y: 130, width: 5, height: 10}, //2
  {x: 290, y: 890, width: 5, height: 10}, //3
  {x: 1690, y: 890, width: 5, height: 10}, //4

]

const people = [
  //Room 1
  {x: 150, y: 370, radius: 13},
  {x: 250, y: 370, radius: 13},
  {x: 350, y: 370, radius: 13},
  {x: 450, y: 370, radius: 13},
  {x: 550, y: 370, radius: 13},
  {x: 150, y: 470, radius: 13},
  {x: 250, y: 470, radius: 13},
  {x: 350, y: 470, radius: 13},
  {x: 450, y: 470, radius: 13},
  {x: 550, y: 470, radius: 13},
  {x: 350, y: 150, radius: 13},
  //Room 2
  {x: 1450, y: 370, radius: 13},
  {x: 1550, y: 370, radius: 13},
  {x: 1650, y: 370, radius: 13},
  {x: 1310, y: 500, radius: 13},
  {x: 1850, y: 370, radius: 13},
  {x: 1450, y: 470, radius: 13},
  //{x: 1550, y: 470, radius: 13},
  {x: 1650, y: 470, radius: 13},
  {x: 1750, y: 470, radius: 13},
  {x: 1850, y: 470, radius: 13},
  {x: 1650, y: 150, radius: 13},
  //Room 3
  {x: 150, y: 680, radius: 13},
  {x: 250, y: 680, radius: 13},
  {x: 350, y: 680, radius: 13},
  {x: 450, y: 680, radius: 13},
  //{x: 150, y: 780, radius: 13},
  {x: 250, y: 780, radius: 13},
  {x: 350, y: 780, radius: 13},
  {x: 450, y: 780, radius: 13},
  {x: 300, y: 880, radius: 13},
  //Room 4
  {x: 1550, y: 680, radius: 13},
  {x: 1650, y: 680, radius: 13},
  {x: 1750, y: 680, radius: 13},
  {x: 1850, y: 680, radius: 13},
  {x: 1550, y: 780, radius: 13},
  {x: 1650, y: 780, radius: 13},
  {x: 1750, y: 780, radius: 13},
  {x: 1850, y: 780, radius: 13},
  {x: 1700, y: 880, radius: 13},
  //Room 5
  {x: 200, y: 1375, radius: 13},
  {x: 550, y: 1350, radius: 13},
  {x: 572, y: 1370, radius: 13},
  {x: 520, y: 1450, radius: 13},
  {x: 450, y: 1240, radius: 13},
  {x: 400, y: 1450, radius: 13},
  {x: 300, y: 1500, radius: 13},
  {x: 325, y: 1410, radius: 13},
  {x: 650, y: 1300, radius: 13},

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


function gameLoop() {

    const prevX = ball.x;
    const prevY = ball.y;

    // Movement
    if (codes['ArrowUp'] || codes['KeyW']) ball.y -= ball.speed;
    if (codes['ArrowLeft'] || codes['KeyA']) ball.x -= ball.speed;
    if (codes['ArrowDown'] || codes['KeyS']) ball.y += ball.speed;
    if (codes['ArrowRight'] || codes['KeyD']) ball.x += ball.speed;

    //Next Room
     if ((ball.y >= (worldH-40)) && (ball.x >= ((worldW/2)-80) && ball.x<= ((worldW/2)+80))){
      window.location.href="Floor2.html";
    } 

     //Collision Detection
      walls.forEach((wall) => {    
      if (collision(wall)) {
        ball.x = prevX; 
        ball.y = prevY; 
      }
    } )


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
    
    //Walls
    ctx.fillStyle = 'black';
    walls.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    //Desks
   ctx.fillStyle = 'chocolate';
    wallsB.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    //People
    ctx.fillStyle = 'lightseagreen';
    people.forEach((cir) => {
    ctx.beginPath();
    ctx.arc(cir.x, cir.y, cir.radius, 0, 2*Math.PI);
    ctx.fill();
    }); 
    //Chalk
    ctx.fillStyle = 'white';
    wallsW.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    //Text
    /*ctx.fillStyle = '#4A0080';
    ctx.font = '100px Georgia';
      ctx.fillText('Welcome to Equad', 600, 300);
    ctx.font = '60px Georgia';
      ctx.fillText("You've found yourself trapped at 11PM on a Saturday ", 300, 600);
      ctx.fillText("Find your way from the basement to the second floor", 300, 1000);  
      ctx.fillText("And...", 900, 1200);  
    ctx.font = '70px Georgia';
      ctx.fillText('You have one mission', 600, 800);
    ctx.font = '40px Georgia';
    for (let y = 1640; y <= worldH-80; y += 70) {
      for (let x = 45; x <= worldW-150; x += 150) {
      ctx.fillText('Escape', x, y);
    }
  }*/
  
    //Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.strokeRect(0, 0, worldW, worldH);

    //Exit
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.moveTo((worldW/2)-100, worldH-20)
    ctx.lineTo((worldW/2)-100, worldH+200)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo((worldW/2)+100, worldH-20)
    ctx.lineTo((worldW/2)+100, worldH+200)
    ctx.stroke();
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 160;
    ctx.beginPath();
    ctx.moveTo((worldW/2), worldH-20)
    ctx.lineTo((worldW/2), worldH+200)
    ctx.stroke();
    ctx.strokeStyle = '#222244';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo((worldW/2), worldH-20)
    ctx.lineTo((worldW/2), worldH+200)
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
    ctx.strokeText("Welcome to Equad", ball.x-750, ball.y-325);
    ctx.fillStyle = 'white';
    ctx.fillText('Welcome to Equad', ball.x - 750, ball.y - 325);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("Click anywhere to toggle music", ball.x - 750, ball.y + 350);
    ctx.fillStyle = 'white';
    ctx.fillText('Click anywhere to toggle music', ball.x - 750, ball.y + 350);


    if (ball.y <= 666) {
      ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("You're trapped in here on a bright sunny day!", ball.x + 200, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText("You're trapped in here on a bright sunny day!", ball.x + 200, ball.y - 325);
    }
    if (666 < ball.y && ball.y <= 1333) {
        ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("Your one mission is...", ball.x + 450, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText("Your one mission is...", ball.x + 450, ball.y - 325); }
    if (1333 < ball.y && ball.y <= 2000) {
       ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText("Escape!", ball.x + 650, ball.y - 325);
    ctx.fillStyle = 'white';
      ctx.fillText("Escape!", ball.x + 650, ball.y - 325); }
    //ctx.fillText('x:' + ball.x, ball.x - 750, ball.y - 125);
    //ctx.fillText('y:' + ball.y, ball.x - 750, ball.y - 75);

    ctx.restore();

    requestAnimationFrame(gameLoop);
}
gameLoop();
