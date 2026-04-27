const c = document.getElementById("World");
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

const ball = {x: 500, y: 80, radius: 20, speed: 7};

const worldW = 4200;
const worldH = 2000;
const wall = 20;

const codes = {};
document.addEventListener("keydown", e => codes[e.code] = true);
document.addEventListener("keyup", e => codes[e.code] = false);


function gameLoop() {

    // Movement
    //if (codes['ArrowUp'] || codes['KeyW']) ball.y -= ball.speed;
    if (codes['ArrowLeft'] || codes['KeyA']) ball.x -= ball.speed;
    //if (codes['ArrowDown'] || codes['KeyS']) ball.y += ball.speed;
    if (codes['ArrowRight'] || codes['KeyD']) ball.x += ball.speed;


    
 //Next Room
     if ((ball.x >= (worldW-40))){
      window.location.href="index.html";
    } 

    // Stay in Bounds
    ball.x = Math.max(ball.radius+wall, Math.min(worldW-wall-ball.radius, ball.x))
    ball.y = Math.max(ball.radius+wall, Math.min(worldH-wall-ball.radius, ball.y))

    ctx.clearRect(0, 0, c.width, c.height); // Clear last frame

    ctx.save(); // Save Data
    ctx.translate(-(ball.x - c.width/2), -(ball.y - c.height/2)); // Move camera
    
     //Trees

    ctx.fillStyle = 'brown';
    ctx.fillRect (0, -100, 40, 200)
    ctx.fillStyle = 'green'
    ctx.beginPath();
    ctx.moveTo(20, -200);
    ctx.lineTo(70, -100);
    ctx.lineTo(-30, -100);
    ctx.closePath()
    ctx.fill()
    ctx.beginPath();
    ctx.moveTo(20, -200);
    ctx.lineTo(100, 0);
    ctx.lineTo(-60, 0);
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = 'brown';
    ctx.fillRect (0 + 1000, -100, 40, 200)
    ctx.fillStyle = 'green'
    ctx.beginPath();
    ctx.moveTo(20 + 1000, -200);
    ctx.lineTo(70 + 1000, -100);
    ctx.lineTo(-30 + 1000, -100);
    ctx.closePath()
    ctx.fill()
    ctx.beginPath();
    ctx.moveTo(20 + 1000, -200);
    ctx.lineTo(100 + 1000, 0);
    ctx.lineTo(-60 + 1000, 0);
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = 'brown';
    ctx.fillRect (0 + 2000, -100, 40, 200)
    ctx.fillStyle = 'green'
    ctx.beginPath();
    ctx.moveTo(20 + 2000, -200);
    ctx.lineTo(70 + 2000, -100);
    ctx.lineTo(-30 + 2000, -100);
    ctx.closePath()
    ctx.fill()
    ctx.beginPath();
    ctx.moveTo(20 + 2000, -200);
    ctx.lineTo(100 + 2000, 0);
    ctx.lineTo(-60 + 2000, 0);
    ctx.closePath()
    ctx.fill() 

    ctx.fillStyle = 'brown';
    ctx.fillRect (0 + 3000, -100, 40, 200)
    ctx.fillStyle = 'green'
    ctx.beginPath();
    ctx.moveTo(20 + 3000, -200);
    ctx.lineTo(70 + 3000, -100);
    ctx.lineTo(-30 + 3000, -100);
    ctx.closePath()
    ctx.fill()
    ctx.beginPath();
    ctx.moveTo(20 + 3000, -200);
    ctx.lineTo(100 + 3000, 0);
    ctx.lineTo(-60 + 3000, 0);
    ctx.closePath()
    ctx.fill() 

    ctx.fillStyle = 'grey';
    ctx.fillRect (4160, -300, 600, 400)

    //Grass
    ctx.fillStyle = 'green';
    ctx.fillRect(-1000, 100, 7000, 1000)


    
    //Text
    ctx.fillStyle = 'white';
    ctx.font = '30px Calibri';
        ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Outside', ball.x - 750, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('Outside', ball.x - 750, ball.y - 325);
    if(ball.x < 1000) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('Congradulations on escaping!', ball.x + 400, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('Congradulations on escaping!', ball.x + 400, ball.y - 325);
    }

     if(ball.x >= 1000 && ball.x < 2000) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('I hope you had fun playing through', ball.x + 330, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('I hope you had fun playing through', ball.x + 330, ball.y - 325);
    }
  if(ball.x >= 2000 && ball.x < 3000) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('As I had fun making this!', ball.x + 430, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('As I had fun making this!', ball.x + 430, ball.y - 325);
    }

    if(ball.x >= 3000) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeText('And feel free to jump right back in!', ball.x + 320, ball.y - 325);
    ctx.fillStyle = 'white';
    ctx.fillText('And feel free to jump right back in!', ball.x + 320, ball.y - 325);
    }


      //ctx.fillText("Congradulations You Escaped! I hope you had fun escaping Equad, as I had fun making this! And if you're itching for more, feel free to hop back in", 100, -50);
      //ctx.fillText("===>", 4000, -50)

    //Redraw Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    //Display Position
     ctx.fillStyle = '#4A0080';
    ctx.font = '30px Georgia';
    //ctx.fillText('Position', ball.x - 750, ball.y - 275);
    //ctx.fillText('x:' + ball.x, ball.x - 750, ball.y - 225);
    //ctx.fillText('y:' + ball.y, ball.x - 750, ball.y - 175);

    ctx.restore();

    requestAnimationFrame(gameLoop);
}
gameLoop();
