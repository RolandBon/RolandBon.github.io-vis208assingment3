const c = document.getElementById("World");
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const ball = {x: 1000, y: 40, radius: 20, speed: 7};

const worldW = 2000;
const worldH = 1300;
const wall = 20;

const codes = {};
document.addEventListener("keydown", e => codes[e.code] = true);
document.addEventListener("keyup", e => codes[e.code] = false);

const walls = [
    {x: 890, y: 0, width: 20, height: 200}, //1
    {x: 890, y: 300, width: 20, height: 100}, //1
    {x: 750, y: 190, width: 160, height: 20}, //1
    {x: 750, y: 290, width: 160, height: 20}, //1
    {x: 1090, y: 0, width: 20, height: 200}, //2
    {x: 1090, y: 300, width: 20, height: 200}, //2
    {x: 600, y: 390, width: 310, height: 20}, //3
    {x: 500, y: 490, width: 400, height: 20}, //4
    {x: 1000, y: 490, width: 110, height: 20}, //4
    {x: 490, y: 300, width: 20, height: 210}, //5
    {x: 590, y: 200, width: 20, height: 210}, //6
    {x: 500, y: 190, width: 110, height: 20}, //7
    {x: 200, y: 190, width: 210, height: 20}, //1
    {x: 300, y: 290, width: 210, height: 20}, //1
    {x: 200, y: 90, width: 410, height: 20}, //1
    {x: 390, y: 0, width: 20, height: 100}, //1
    {x: 190, y: 190, width: 20, height: 410}, //1
    {x: 190, y: 700, width: 20, height: 500}, //1
    {x: 290, y: 400, width: 20, height: 700}, //1
    {x: 390, y: 400, width: 20, height: 200}, //1
    {x: 390, y: 590, width: 610, height: 20}, //1
    {x: 1000, y: 490, width: 20, height: 120}, //4
    {x: 190, y: 1180, width: 410, height: 20}, //4
    {x: 700, y: 1180, width: 210, height: 20}, //4
    {x: 890, y: 1180, width: 20, height: 100}, //4
    {x: 290, y: 1090, width: 710, height: 20}, //4
    {x: 690, y: 1090, width: 20, height: 110}, //4
    {x: 300, y: 690, width: 300, height: 20}, //5
    {x: 400, y: 790, width: 300, height: 20}, //5
    {x: 300, y: 890, width: 300, height: 20}, //5
    {x: 400, y: 990, width: 500, height: 20}, //5
    {x: 690, y: 600, width: 20, height: 410}, //5
    {x: 990, y: 700, width: 20, height: 410}, //5
    {x: 790, y: 700, width: 20, height: 200}, //5
    {x: 890, y: 800, width: 20, height: 210}, //5
    {x: 790, y: 700, width: 210, height: 20}, //5
    {x: 790, y: 890, width: 110, height: 20}, //5
    {x: 1090, y: 190, width: 110, height: 20}, //2
    {x: 1090, y: 290, width: 210, height: 20}, //2
    {x: 1190, y: 100, width: 20, height: 110}, //2
    {x: 1190, y: 90, width: 610, height: 20}, //2
    {x: 1290, y: 200, width: 20, height: 110}, //2
    {x: 1290, y: 190, width: 510, height: 20}, //2
    {x: 1890, y: 90, width: 20, height: 1100}, //2
    {x: 1900, y: 890, width: 100, height: 20}, //2
    {x: 1490, y: 290, width: 410, height: 20}, //2
    {x: 1390, y: 300, width: 20, height: 500}, //2
    {x: 1090, y: 600, width: 20, height: 100}, //2
    {x: 990, y: 700, width: 310, height: 20}, //2
    {x: 1190, y: 400, width: 20, height: 210}, //2
    {x: 1190, y: 390, width: 220, height: 20}, //2
    {x: 1290, y: 500, width: 20, height: 220}, //2
    {x: 1100, y: 790, width: 310, height: 20}, //2
    {x: 1090, y: 790, width: 20, height: 220}, //2
    {x: 1100, y: 990, width: 310, height: 20}, //2
    {x: 1200, y: 890, width: 210, height: 20}, //2
    {x: 1490, y: 490, width: 20, height: 520}, //2
    {x: 1090, y: 790, width: 20, height: 220}, //2
    {x: 1100, y: 1090, width: 510, height: 20}, //2
    {x: 1590, y: 600, width: 20, height: 510}, //2
    {x: 900, y: 1180, width: 810, height: 20}, //2
    {x: 1390, y: 900, width: 20, height: 100}, //2
    {x: 1590, y: 1100, width: 20, height: 100}, //2
    {x: 1390, y: 900, width: 20, height: 100}, //2
    {x: 1390, y: 390, width: 410, height: 20}, //2
    {x: 1690, y: 490, width: 20, height: 710}, //2
    {x: 1490, y: 490, width: 200, height: 20}, //2
    {x: 1790, y: 390, width: 20, height: 810}, //2
    {x: 1790, y: 1180, width: 120, height: 20}, //2


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
      window.location.href="Floor1.html";
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

    //Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.strokeRect(0, 0, worldW, worldH);

    //Entrance
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.moveTo((worldW/2)-100, -200)
    ctx.lineTo((worldW/2)-100, 20)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo((worldW/2)+100, -200)
    ctx.lineTo((worldW/2)+100, 20)
    ctx.stroke();
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 160;
    ctx.beginPath();
    ctx.moveTo((worldW/2), -200)
    ctx.lineTo((worldW/2), 20)
    ctx.stroke();
    ctx.strokeStyle = '#222244';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo((worldW/2), -200)
    ctx.lineTo((worldW/2), 20)
    ctx.stroke();
 

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

    /*Text
    ctx.fillStyle = '#4A0080';
    ctx.font = '80px Georgia';
    ctx.fillText('Welcome To', 400, -50);
    ctx.fillText('The Basement', 1150, -50);*/
 
  
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
    ctx.strokeText('Basement', ball.x - 750, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('Basement', ball.x - 750, ball.y - 325);
    //ctx.fillText('x:' + ball.x, ball.x - 750, ball.y - 275);
    //ctx.fillText('y:' + ball.y, ball.x - 750, ball.y - 225);

    ctx.restore();

    requestAnimationFrame(gameLoop);
}
gameLoop();
