const c = document.getElementById("World");
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const ball = {x: 1000, y: 100, radius: 20, speed: 15};

const worldW = 2000;
const worldH = 2000;
const wall = 20;

const codes = {};
document.addEventListener("keydown", e => codes[e.code] = true);
document.addEventListener("keyup", e => codes[e.code] = false);

const walls = [
    {x: 100, y: 100, width: 50, height: 100},
    {x: 400, y: 500, width: 50, height: 100},

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


    //Collision Detection
    
      walls.forEach((wall) => {    
      if (collision(wall)) {
        ball.x = prevX 
        ball.y = prevY 
      }
    } )

    //Next Room
     if ((ball.y >= (worldH-30)) && (ball.x >= ((worldW/2)-80) && ball.x<= ((worldW/2)+80))){
      window.location.href="Floor1.html";
    } 

    //Previous Room
     if ((ball.y <= (ball.radius+5)) && (ball.x >= ((worldW/2)-80) && ball.x<= ((worldW/2)+80))) {
      window.location.href="index.html";
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
    
    //Walls
    walls.forEach((wall) => {
      ctx.fillStyle = 'black';
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    //Text
    ctx.fillStyle = 'white';
    ctx.font = '100px Arial';
    ctx.fillText('Welcome to MAE!', 600, 300);
    ctx.font = '70px Arial';
    ctx.fillText('you have one mission...', 600, 1200);
    ctx.font = '40px Arial';
    for (let y = 1780; y <= worldH-80; y += 70) {
      for (let x = 45; x <= worldW-150; x += 150) {
      ctx.fillText('escape', x, y);
    }
  }
  
    //Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 40;
    ctx.strokeRect(0, 0, worldW, worldH);

    //Exit
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
 
  
    //Redraw Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    //Display Position
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('Position', ball.x - 750, ball.y - 325);
    ctx.fillText('x:' + ball.x, ball.x - 750, ball.y - 275);
    ctx.fillText('y:' + ball.y, ball.x - 750, ball.y - 225);
    ctx.restore();

    requestAnimationFrame(gameLoop);
}
gameLoop();
